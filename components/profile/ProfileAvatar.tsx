import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View } from "react-native";

interface ProfileAvatarProps {
  initials: string;
}

export function ProfileAvatar({ initials }: ProfileAvatarProps) {
  return (
    <View style={styles.wrapper}>
      <LinearGradient
        colors={["#5B6BF8", "#4B5BF0"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.circle}
      >
        <Text style={styles.initials}>{initials}</Text>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    marginTop: 16,
    marginBottom: 24,
  },
  circle: {
    width: 72,
    height: 72,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
  initials: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "800",
    letterSpacing: -0.3,
  },
});
