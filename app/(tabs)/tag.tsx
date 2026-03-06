import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function Tag() {
  const router = useRouter();

  return (
    <LinearGradient colors={["#EAF4F2", "#C8E8E3", "#A4DAD2"]} style={styles.container}>
      
      {/* Header Bar */}
      <View style={styles.headerBar}>
        <View style={styles.headerDot} />
        <Text style={styles.headerLabel}>MEDICAL INFORMATION</Text>
        <View style={styles.headerDot} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Card */}
        <View style={styles.card}>
          
          {/* Logo / Avatar Section */}
          <View style={styles.avatarWrapper}>
            <View style={styles.avatarRing}>
              <Image
                source={require('./../../assets/images/logo.png')}
                style={styles.avatar}
                resizeMode="contain"
              />
            </View>
            <View style={styles.statusBadge}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>Active</Text>
            </View>
          </View>

          {/* Name */}
          <Text style={styles.patientName}>Charles Jansen D. Alcantara</Text>
          <Text style={styles.patientId}>Patient ID: #00-2024-CJA</Text>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Info Rows */}
          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>CONTACT DETAILS</Text>

            <InfoRow icon="📱" label="Primary Phone" value="+63 123 456 7890" />

            <View style={styles.subDivider} />
            <Text style={styles.sectionTitle}>EMERGENCY CONTACTS</Text>

            <InfoRow icon="👤" label="Contact Person 1" value="Charles" />
            <InfoRow icon="📞" label="Phone" value="+63 098 765 4321" />

            <View style={styles.subDivider} />

            <InfoRow icon="👤" label="Contact Person 2" value="Alcantara" />
            <InfoRow icon="📞" label="Phone" value="+63 098 765 4321" />
          </View>
        </View>

        {/* Home Button */}
        <Pressable
          style={({ pressed }) => [styles.homeBtn, pressed && styles.homeBtnPressed]}
          onPress={() => router.push("/")}
        >
          <Text style={styles.homeBtnText}>← Return to Home</Text>
        </Pressable>

      </ScrollView>
    </LinearGradient>
  );
}

function InfoRow({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoIcon}>{icon}</Text>
      <View style={styles.infoText}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingTop: 56,
    paddingBottom: 12,
    paddingHorizontal: 24,
  },
  headerDot: {
    width: 5,
    height: 5,
    borderRadius: 999,
    backgroundColor: "#3A8C82",
    opacity: 0.6,
  },
  headerLabel: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 3,
    color: "#3A8C82",
  },
  scroll: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 48,
  },
  card: {
    backgroundColor: "#FFFFFFD0",
    borderRadius: 24,
    padding: 28,
    shadowColor: "#2D7A72",
    shadowOpacity: 0.12,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
    borderWidth: 1,
    borderColor: "#C0E0DB",
  },
  avatarWrapper: {
    alignItems: "center",
    marginBottom: 16,
  },
  avatarRing: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 3,
    borderColor: "#58A99F",
    backgroundColor: "#EAF7F5",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  avatar: {
    width: 90,
    height: 90,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#E6F7F4",
    borderWidth: 1,
    borderColor: "#A4DAD2",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    marginTop: 10,
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 999,
    backgroundColor: "#3CB371",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#2D7A50",
    letterSpacing: 0.5,
  },
  patientName: {
    fontSize: 20,
    fontWeight: "800",
    color: "#1A3D3A",
    textAlign: "center",
    letterSpacing: 0.3,
  },
  patientId: {
    fontSize: 12,
    color: "#5A8A85",
    textAlign: "center",
    marginTop: 4,
    letterSpacing: 0.8,
  },
  divider: {
    height: 1,
    backgroundColor: "#C0E0DB",
    marginVertical: 20,
  },
  subDivider: {
    height: 1,
    backgroundColor: "#DFF0EE",
    marginVertical: 14,
  },
  infoSection: {
    gap: 10,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 2.5,
    color: "#58A99F",
    marginBottom: 4,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#F2FAF9",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  infoIcon: {
    fontSize: 16,
  },
  infoText: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 11,
    color: "#7AADA9",
    fontWeight: "500",
    letterSpacing: 0.3,
  },
  infoValue: {
    fontSize: 15,
    color: "#1A3D3A",
    fontWeight: "600",
    marginTop: 1,
  },
  homeBtn: {
    marginTop: 24,
    backgroundColor: "#3A8C82",
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
    shadowColor: "#2D7A72",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  homeBtnPressed: {
    backgroundColor: "#2D7A72",
    transform: [{ scale: 0.98 }],
  },
  homeBtnText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});