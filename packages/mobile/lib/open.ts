import { Linking } from "react-native";
import { router } from "expo-router";

export function openDestination(href: string) {
  if (href.startsWith("http") || href.startsWith("mailto:")) {
    return Linking.openURL(href);
  }
  router.push(href);
}
