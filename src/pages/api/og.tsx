import { ImageResponse } from "@vercel/og";
import { NextApiHandler } from "next";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  runtime: "experimental-edge",
};

const mediumFont = fetch(
  new URL("../../../public/fonts/Satoshi-Medium.ttf", import.meta.url),
).then((res) => res.arrayBuffer());

const boldFont = fetch(
  new URL("../../../public/fonts/Satoshi-Black.ttf", import.meta.url),
).then((res) => res.arrayBuffer());

const handler = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url ?? "");
  const title = searchParams.get("title");
  const type = searchParams.get("type");

  const mediumFontData = await mediumFont;
  const boldFontData = await boldFont;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          backgroundColor: "#222",
          color: "#fff",
          width: "100%",
          height: "100%",
          flexDirection: "column",
          justifyContent: "center",
          fontFamily: "SatoshiMedium",
          padding: "8rem",
        }}
      >
        {type && (
          <h3
            style={{
              color: "#aaa",
              textTransform: "uppercase",
            }}
          >
            {type}
          </h3>
        )}

        <h1 style={{ fontFamily: "SatoshiBold", fontSize: 64 }}>
          {title ?? "Plorium"}
        </h1>
        <h2
          style={{
            fontSize: 24,
          }}
        >
          Discover the best way to learn anything on the internet
        </h2>
        <h3
          style={{
            fontSize: 24,
          }}
        >
          plorium.com
        </h3>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "SatoshiMedium",
          data: mediumFontData,
          style: "normal",
        },
        {
          name: "SatoshiBold",
          data: boldFontData,
          style: "normal",
        },
      ],
    },
  );
};

export default handler;
