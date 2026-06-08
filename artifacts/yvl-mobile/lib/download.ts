import { Paths, File, DownloadTask } from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";
import { Alert, Platform } from "react-native";

function safeName(str: string) {
  return str.replace(/[/\\?%*:|"<>]/g, "-").trim();
}

export type DownloadState = "idle" | "downloading" | "done" | "error";

export async function downloadSong(
  url: string,
  title: string,
  artist: string,
  onProgress?: (pct: number) => void
): Promise<boolean> {
  try {
    const filename = `${safeName(title)} - ${safeName(artist)}.mp4`;
    const dest = new File(Paths.document, filename);

    const task = new DownloadTask(url, dest, {
      onProgress: (progress) => {
        if (progress.totalBytesExpectedToWrite > 0) {
          onProgress?.(progress.totalBytesWritten / progress.totalBytesExpectedToWrite);
        }
      },
    });

    const result = await task.downloadAsync();
    if (!result) return false;
    const localUri = result.uri;

    if (Platform.OS === "android" || Platform.OS === "ios") {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status === "granted") {
        await MediaLibrary.saveToLibraryAsync(localUri);
        return true;
      }
    }

    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(localUri, { mimeType: "audio/mp4" });
    }
    return true;
  } catch (err) {
    console.warn("Download failed:", err);
    return false;
  }
}
