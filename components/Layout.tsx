import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { cls } from "../libs/client/utils";
import FooterIcon from "./FooterIcon";

interface ILayout {
  children: React.ReactChild;
  seoTitle: string;
  isAuthPage?: boolean;
  hasStatusBar?: boolean;
  isChatPage?: boolean;
}

const Layout: React.FC<ILayout> = ({
  children,
  seoTitle,
  isAuthPage = false,
  isChatPage = false,
  hasStatusBar = true,
}) => {
  const router = useRouter();
  return (
    <div
      className={cls(
        "flex flex-col justify-center items-center",
        isAuthPage ? "bg-yellow-300" : isChatPage ? "bg-sky-500" : "bg-white"
      )}
    >
      <Head>
        <title>{seoTitle} | KaKao</title>
      </Head>
      <div className="min-w-[480px]">
        <main>{children}</main>
        {!isAuthPage && hasStatusBar && (
          <footer className="fixed bottom-0 left-0 w-full bg-gray-100 flex justify-around py-2">
            <FooterIcon current={router.pathname === "/user"}>
              <Link href={"/user"}>
                <a>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </Link>
            </FooterIcon>
            <FooterIcon current={router.pathname === "/user/chats"}>
              <Link href={"/user/chats"}>
                <a>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                    <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                  </svg>
                </a>
              </Link>
            </FooterIcon>
            <FooterIcon current={router.pathname === "/user/profile"}>
              <Link href={"/user/profile"}>
                <a>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                  </svg>
                </a>
              </Link>
            </FooterIcon>
          </footer>
        )}
      </div>
    </div>
  );
};

export default Layout;
