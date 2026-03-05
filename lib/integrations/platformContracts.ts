export interface AemContentBlock {
  id: string;
  type: "text" | "image" | "cta";
  payload: Record<string, string>;
}

export interface JavaServiceRequest {
  tenantId: string;
  skinTone: string;
  occasion: string;
  weather: string;
}

export interface KmmSharedModel {
  recommendationId: string;
  title: string;
  confidence: number;
}

export interface CloudTarget {
  provider: "aws" | "azure";
  region: string;
  apiGatewayBaseUrl: string;
}

export const defaultCloudTargets: CloudTarget[] = [
  { provider: "aws", region: "ap-south-1", apiGatewayBaseUrl: "https://example.execute-api.ap-south-1.amazonaws.com" },
  { provider: "azure", region: "centralindia", apiGatewayBaseUrl: "https://example.azure-api.net" },
];
