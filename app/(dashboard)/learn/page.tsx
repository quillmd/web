import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
export default function LearnPage() {
  const lessons = [
    {
      title: "Introduction to Squire",
      description: "Learn the basics of Squire and get ready for your quest.",
      src: "https://www.youtube.com/embed/sEvfa_ayQFQ?si=d45ukpwv1p8mfSMd",
    },
  ];

  return (
    <div className="mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Learn Squire</h1>
      <div className="space-y-8">
        {lessons.map((lesson, index) => (
          <Card key={index} className="w-screen max-w-screen-lg">
            <CardHeader>
              <CardTitle>{lesson.title}</CardTitle>
              <CardDescription>{lesson.description}</CardDescription>
            </CardHeader>
            <CardContent className="w-screen max-w-screen-lg">
              <div className="mx-auto">
                <AspectRatio ratio={16 / 9}>
                  <iframe
                    src={lesson.src}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </AspectRatio>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
