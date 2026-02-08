import { HomeHeader } from "@/components/home/HomeHeader";
import { SearchBar } from "@/components/home/SearchBar";
import { WordFamilyCard } from "@/components/home/WordFamilyCard";
import { ScrollView } from "react-native";

const WORD_FAMILIES = [
  {
    title: "struct",
    meaning: "to build",
    wordCount: 12,
    progress: 75,
    imageUrl:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=200&h=200&fit=crop",
  },
  {
    title: "bene",
    meaning: "good, well",
    wordCount: 8,
    progress: 30,
    imageUrl:
      "https://images.unsplash.com/photo-1474631245212-32dc3c8310c6?w=200&h=200&fit=crop",
  },
  {
    title: "dict",
    meaning: "to say, to speak",
    wordCount: 10,
    isNew: true,
    imageUrl:
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=200&h=200&fit=crop",
  },
  {
    title: "port",
    meaning: "to carry",
    wordCount: 9,
    imageUrl:
      "https://images.unsplash.com/photo-1494412574643-ff11b0a5eb19?w=200&h=200&fit=crop",
  },
];

export default function HomeScreen() {
  return (
    <ScrollView className="flex-1 bg-[#121318]">
      <HomeHeader />
      <SearchBar />
      {WORD_FAMILIES.map((family) => (
        <WordFamilyCard key={family.title} {...family} />
      ))}
    </ScrollView>
  );
}
