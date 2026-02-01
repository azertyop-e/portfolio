import { Frame } from "@/components/Frame/Frame";
import { Nav } from "@/components/Nav/Nav";
import { Footer } from "@/components/Footer/Footer";
import { CursorProvider } from "@/components/Cursor/CursorContext";
import { Cursor } from "@/components/Cursor/Cursor";
import { SmoothScroll } from "@/components/SmoothScroll/SmoothScroll";
import { ScrollToTop } from "@/components/ScrollToTop/ScrollToTop";
import { PageTransitionProvider } from "@/components/PageTransition";
import { Preloader } from "@/components/Preloader";
import styles from "./layout.module.scss";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ScrollToTop>
      <CursorProvider>
        <PageTransitionProvider>
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
        </PageTransitionProvider>
      </CursorProvider>
    </ScrollToTop>
  );
}
