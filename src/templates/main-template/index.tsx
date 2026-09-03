import { Container } from "../../components/container";
import { Footer } from "../../components/footer";
import { Logo } from "../../components/logo";
import { Menu } from "../../components/menu";

type MainTemplateProps = {
  children: React.ReactNode;
};

export function MainTemplate({ children }: MainTemplateProps) {
  return (
    <>
      <Container>
        <Logo />
      </Container>

      <Container>
        <Menu />
      </Container>

      {children}

      <Container>
        <Footer />
      </Container>
    </>
  );
}
