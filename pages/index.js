import { range } from "lodash";

export default function Home() {
  return (
    <div className="container">
      <div className="title">
        oddnaan.com
        <div className="fg">oddnaan.com</div>
        {range(12).map((i) => (
          <div
            className="shadow"
            style={{
              animationDelay: `${(2 / 12) * i}s`,
              color: `hsl(${i * 30}, 58%, 50%)`,
            }}
          >
            oddnaan.com
          </div>
        ))}
      </div>
    </div>
  );
}
