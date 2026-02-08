import { SearchBar } from "@/components/home/SearchBar";
import { SetCard } from "@/components/sets/SetCard";
import { SetsHeader } from "@/components/sets/SetsHeader";
import { ScrollView } from "react-native";

const MOCK_SETS = [
  {
    id: "1",
    title: "Struct",
    meaning: "To build",
    wordCount: 5,
    progress: 80,
    imageUrl: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=200&h=200&fit=crop",
  },
  {
    id: "2",
    title: "Bene",
    meaning: "Good, well",
    wordCount: 4,
    progress: 30,
    imageUrl: "https://images.unsplash.com/photo-1474631245212-32dc3c8310c6?w=200&h=200&fit=crop",
  },
  {
    id: "3",
    title: "Chron",
    meaning: "Time",
    wordCount: 6,
    isNew: true,
    imageUrl: "https://images.unsplash.com/photo-1501139083538-0139583c060f?w=200&h=200&fit=crop",
  },
];

export default function SetsScreen() {
  return (
    <ScrollView className="flex-1 bg-[#121318]">
      <SetsHeader totalSets={MOCK_SETS.length} />
      <SearchBar placeholder="Search sets..." />
      {MOCK_SETS.map((set) => (
        <SetCard
          key={set.id}
          title={set.title}
          meaning={set.meaning}
          wordCount={set.wordCount}
          progress={set.progress}
          isNew={set.isNew}
          imageUrl={set.imageUrl}
        />
      ))}
    </ScrollView>
  );
}
