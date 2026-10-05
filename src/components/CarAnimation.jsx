export default function CarAnimation({ running = false }) {
  return (
    <svg
      className={`vehicle-art ${running ? "running" : ""}`}
      viewBox="0 0 720 300"
      role="img"
      aria-label="Illustration of a silver sports sedan"
    >
      <defs>
        <linearGradient id="paint" x2="0.3" y2="1">
          <stop stopColor="#f3f6f7" />
          <stop offset=".45" stopColor="#aab7c3" />
          <stop offset="1" stopColor="#52616c" />
        </linearGradient>
        <linearGradient id="glass" x2="1" y2="1">
          <stop stopColor="#22313d" />
          <stop offset="1" stopColor="#09121d" />
        </linearGradient>
      </defs>
      <ellipse cx="367" cy="244" rx="292" ry="17" fill="#000" opacity=".23" />
      <path
        d="M77 195L95 167 207 145 294 78Q322 60 395 73L489 130 609 151Q644 157 657 183L664 215 630 231H111L75 216Z"
        fill="url(#paint)"
        stroke="#637786"
        strokeWidth="2"
      />
      <path d="M229 144L300 87Q334 77 383 84L463 132Z" fill="url(#glass)" />
      <path
        d="M358 83L362 137M215 154L500 140M365 149L367 220M491 146L513 218"
        stroke="#5e707c"
        strokeWidth="2"
      />
      <path
        d="M95 175L179 166 164 180 91 189M586 161L636 174 642 188 586 181"
        fill="#dffcff"
      />
      <path d="M104 202H165M549 201H651" stroke="#172a35" strokeWidth="9" />
      <path
        d="M269 157H293M422 151H446"
        stroke="#405360"
        strokeWidth="5"
        strokeLinecap="round"
      />
      {[206, 537].map((x) => (
        <g key={x}>
          <circle cx={x} cy="219" r="43" fill="#10181f" />
          <circle cx={x} cy="219" r="29" fill="#81909b" />
          <circle cx={x} cy="219" r="23" fill="#283743" />
          {[0, 60, 120].map((a) => (
            <path
              key={a}
              d={`M${x - 24} 219H${x + 24}`}
              stroke="#b8c5cd"
              strokeWidth="5"
              transform={`rotate(${a} ${x} 219)`}
            />
          ))}
          <circle cx={x} cy="219" r="7" fill="#d4dce1" />
        </g>
      ))}
      <path
        d="M259 190Q340 181 469 178"
        fill="none"
        stroke="#e3eef3"
        opacity=".55"
        strokeWidth="3"
      />
    </svg>
  );
}
