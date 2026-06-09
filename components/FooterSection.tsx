import Image from "next/image";

export default function FooterSection() {
  return (
    <footer
      className="relative w-full bg-white"
      style={{ minHeight: "clamp(120px, 12.7vw, 244px)" }}
    >
      <div
        className="flex items-center"
        style={{
          padding: "clamp(24px, 2.66vw, 51px) 0 clamp(24px, 2.66vw, 51px) clamp(24px, 2.76vw, 53px)",
          gap: "clamp(12px, 1.15vw, 22px)",
        }}
      >
        {/* 로고 */}
        <div
          style={{
            width: "clamp(160px, 29.1vw, 559px)",
            height: "clamp(42px, 7.66vw, 147px)",
            position: "relative",
            flexShrink: 0,
          }}
        >
          <Image
            src="/images/footer-logo.png"
            alt="Oscotec Inc."
            fill
            className="object-contain object-left"
          />
        </div>

        {/* 수직 구분선 */}
        <div
          style={{
            width: "1px",
            height: "clamp(50px, 8.3vw, 160px)",
            background: "#d4d4d4",
            flexShrink: 0,
            margin: "0 clamp(8px, 0.83vw, 16px)",
          }}
        />

        {/* 연락처 정보 */}
        <div
          className="flex"
          style={{
            color: "#6d6d6d",
            fontSize: "clamp(11px, 1.25vw, 24px)",
            fontWeight: 400,
            gap: "clamp(16px, 1.46vw, 28px)",
          }}
        >
          <div
            className="flex flex-col"
            style={{ gap: "clamp(10px, 1.25vw, 24px)" }}
          >
            <p>Address</p>
            <p>Tel</p>
            <p>E-mail</p>
          </div>
          <div
            className="flex flex-col"
            style={{ gap: "clamp(10px, 1.25vw, 24px)" }}
          >
            <p>경기도 성남시 분당구 대왕판교로 700 (삼평동)</p>
            <p>+82-31-628-7630</p>
            <p>customer@oscotec.com</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
