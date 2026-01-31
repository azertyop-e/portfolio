import { Frame } from "@/components/Frame/Frame";
import { Nav } from "@/components/Nav/Nav";
import { Footer } from "@/components/Footer/Footer";
import { CursorProvider } from "@/components/Cursor/CursorContext";
import { Cursor } from "@/components/Cursor/Cursor";
import { SmoothScroll } from "@/components/SmoothScroll/SmoothScroll";
import { Preloader } from "@/components/Preloader";
import styles from "./layout.module.scss";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CursorProvider>
      <Preloader>
        <SmoothScroll>
          <Cursor />
          <Frame>
            <Nav />
            <main className={styles.main}>{children}</main>
            <Footer />
          </Frame>
        </SmoothScroll>
      </Preloader>
    </CursorProvider>
  );
}
