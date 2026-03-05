import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    integrations: {
      aws: "adapter-ready",
      azure: "adapter-ready",
      aem: "content-connector-ready",
      java: "gateway-ready",
      kmm: "shared-contract-ready",
      angular: "micro-frontend-ready",
      jquery: "legacy-widget-ready",
    },
    strategy: "API-first + microservice compatible contracts",
  });
}
