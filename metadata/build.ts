/**
 * Configuration-driven build script for raylib_deno project
 * Reads build-config.json to determine build parameters
 */

import { ensureDir, copy, exists } from "@std/fs";
import { join } from "@std/path";

// Load build configuration
const configPath = join("metadata", "project.json");

interface BuildConfig {
  project: {
    name: string;
    displayName: string;
    description: string;
    version: string;
    author: string;
    license: string;
    repository: string;
    homepage: string;
  };
  build: {
    executableName: string;
    buildDir: string;
    sourceFiles: {
      main: string;
      assets: string;
      blobs: string;
    };
    targetFiles: {
      blobs: string;
      assets: string;
    };
    cleanBeforeBuild: boolean;
  };
  distribution: {
    portable: boolean;
    standalone: boolean;
    requiresDeno: boolean;
    requiresNode: boolean;
    minimumRequirements: {
      memory: string;
      diskSpace: string;
    };
  };
  dependencies: {
    raylib: {
      version: string;
      nativeLibs: {
        windows: string;
        darwin: string;
        linux: string;
      };
    };
    denoStd: {
      version: string;
      modules: string[];
    };
  };
}

let config: BuildConfig;

try {
  const configText = await Deno.readTextFile(configPath);
  config = JSON.parse(configText);
} catch (error) {
  let errorMsg: string;
  if (error && typeof error === "object" && "message" in error) {
    errorMsg = (error as { message: string }).message;
  } else {
    errorMsg = String(error);
  }
  console.error(
    `❌ Failed to load build configuration from ${configPath}: ${errorMsg}`
  );
  Deno.exit(1);
}

// Extract configuration values
const PLATFORM = Deno.build.os;
const ARCH = Deno.build.arch;
const PLATFORM_DIR = join(config.build.buildDir, `${PLATFORM}-${ARCH}`);
const EXECUTABLE_NAME = config.build.executableName;
const EXECUTABLE_EXT = PLATFORM === "windows" ? ".exe" : "";

// Source and target paths from config
const SOURCE_FILES = config.build.sourceFiles;
const TARGET_FILES = config.build.targetFiles;

// Target paths in build directory
const TARGET_PATHS = {
  executable: join(PLATFORM_DIR, `${EXECUTABLE_NAME}${EXECUTABLE_EXT}`),
  blobs: join(PLATFORM_DIR, TARGET_FILES.blobs),
  assets: join(PLATFORM_DIR, TARGET_FILES.assets),
};

async function cleanBuildDir() {
  if (config.build.cleanBeforeBuild) {
    console.log("🧹 Cleaning build directory...");
    if (await exists(config.build.buildDir)) {
      await Deno.remove(config.build.buildDir, { recursive: true });
    }
  }
  await ensureDir(PLATFORM_DIR);
}

async function compileExecutable() {
  console.log(
    `🔨 Compiling ${config.project.displayName} for ${PLATFORM}-${ARCH}...`
  );

  // Ensure the build directory exists before compiling
  await ensureDir(PLATFORM_DIR);

  const compileArgs = [
    "compile",
    "-A",
    "--unstable-ffi",
    SOURCE_FILES.main,
    "-o",
    TARGET_PATHS.executable,
  ];

  console.log(`Running: deno ${compileArgs.join(" ")}`);

  const compileProcess = new Deno.Command("deno", {
    args: compileArgs,
    stdout: "inherit",
    stderr: "inherit",
  });

  const { code } = await compileProcess.output();

  if (code !== 0) {
    throw new Error(`Compilation failed with exit code ${code}`);
  }

  // Verify the executable was created
  if (!(await exists(TARGET_PATHS.executable))) {
    // Check if it was created in the current directory with a different name
    const currentDirExe = `raylib_deno${EXECUTABLE_EXT}`;
    if (await exists(currentDirExe)) {
      console.log(
        `📁 Moving executable from ${currentDirExe} to ${TARGET_PATHS.executable}`
      );
      await Deno.rename(currentDirExe, TARGET_PATHS.executable);
    } else {
      throw new Error(
        `Executable was not created at ${TARGET_PATHS.executable}`
      );
    }
  }

  console.log(`✅ Executable compiled: ${TARGET_PATHS.executable}`);
}

async function copyBlobs() {
  console.log("📦 Copying native library blobs...");

  if (!(await exists(SOURCE_FILES.blobs))) {
    throw new Error(`Blobs directory not found: ${SOURCE_FILES.blobs}`);
  }

  await ensureDir(TARGET_PATHS.blobs);
  await copy(SOURCE_FILES.blobs, TARGET_PATHS.blobs, { overwrite: true });

  console.log(`✅ Blobs copied to: ${TARGET_PATHS.blobs}`);
}

async function copyAssets() {
  console.log("🎨 Copying assets...");

  if (!(await exists(SOURCE_FILES.assets))) {
    console.log("⚠️  No assets directory found, skipping...");
    return;
  }

  await ensureDir(TARGET_PATHS.assets);
  await copy(SOURCE_FILES.assets, TARGET_PATHS.assets, { overwrite: true });

  console.log(`✅ Assets copied to: ${TARGET_PATHS.assets}`);
}

async function main() {
  console.log(
    `🚀 Building ${config.project.displayName} for ${PLATFORM}-${ARCH}`
  );
  console.log(`📁 Build directory: ${PLATFORM_DIR}`);
  console.log(`📋 Using configuration: ${configPath}`);

  try {
    await cleanBuildDir();
    await compileExecutable();
    await copyBlobs();
    await copyAssets();

    console.log("\n🎉 Build completed successfully!");
    console.log(`📁 Build output: ${PLATFORM_DIR}`);
  } catch (error) {
    // v1.02: Fix error handling for unknown type in catch (consistent with config load error handling)
    if (error && typeof error === "object" && "message" in error) {
      console.error("❌ Build failed:", (error as { message: string }).message);
    } else {
      console.error("❌ Build failed:", String(error));
    }
    Deno.exit(1);
  }
}

if (import.meta.main) {
  await main();
}
