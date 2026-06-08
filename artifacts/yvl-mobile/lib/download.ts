import { Alert } from "react-native";

export type DownloadState = "idle" | "downloading" | "done" | "error";

export async function downloadSong(
  _url: string,
  _title: string,
  _artist: string,
  _onProgress?: (pct: number) => void
): Promise<boolean> {
  Alert.alert("Download", "Download is only available on Android/iOS.");
  return false;
}
