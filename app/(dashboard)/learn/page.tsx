import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { AspectRatio } from "@/components/ui/aspect-ratio"
export default function LearnPage() {
  const lessons = [
    {
      title: "Introduction to Squire",
      description: "Learn the basics of Squire and get ready for your quest.",
      src: "https://www.youtube.com/embed/tUklOgcj_1U?si=-go_VPMLmCm_rWRX"
    },
    // {
    //   title: "Proper Stance and Grip",
    //   description: "Master the fundamental stance and grip techniques for Squire.",
    //   src: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    // },
    // {
    //   title: "Footwork and Movement",
    //   description: "Enhance your Squire skills with advanced footwork and movement techniques.",
    //   src: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    // },
    // {
    //   title: "Putting It All Together",
    //   description: "Combine all your learned skills to become a true Squire master.",
    //   src: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    // }
  ]

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
  )
}