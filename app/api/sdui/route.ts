import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    page: "tech-lab",
    sections: [
      {
        type: "hero",
        title: "Server-Driven UI Demo",
        subtitle: "Yeh blocks server schema se render hote hain.",
      },
      {
        type: "tips",
        items: ["API-first contracts", "Microservice-friendly payload", "Client renderer keeps UI flexible"],
      },
      {
        type: "cta",
        label: "Use in production flows",
      },
    ],
  });
}
