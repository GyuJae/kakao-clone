import Head from "next/head";

interface ILayout {
  children: React.ReactChild;
  seoTitle: string;
}

const style = {
  wrapper: "",
};

const Layout: React.FC<ILayout> = ({ children, seoTitle }) => {
  return (
    <div className="bg-yellow-300 flex justify-center items-center">
      <Head>
        <title>{seoTitle} | KaKao</title>
      </Head>
      <div className="min-w-[480px]">{children}</div>
    </div>
  );
};

export default Layout;
