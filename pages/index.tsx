import { useMutation } from "@apollo/client";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import Layout from "@components/Layout";
import LoadingSpiner from "@components/LoadingSpiner";
import { authTokenVar, LOCALSTORAGE_TOKEN } from "@libs/client/apollo";
import { LOGIN_MUTATION } from "@libs/server/mutations/login.gql";
import {
  login,
  loginVariables,
} from "@libs/server/mutations/__generated__/login";

interface ILogin {
  email: string;
  password: string;
  stateError?: string;
}

const Home: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
  } = useForm<ILogin>();

  const router = useRouter();

  const [mutate, { loading }] = useMutation<login, loginVariables>(
    LOGIN_MUTATION,
    {
      onCompleted: ({ login: { ok, error, token } }) => {
        if (ok && token) {
          localStorage.setItem(LOCALSTORAGE_TOKEN, token);
          authTokenVar(token);
          router.replace("/user");
        } else if (!ok && error) {
          setError("stateError", {
            message: error,
          });
        }
      },
    }
  );

  const onSubmit: SubmitHandler<ILogin> = (data) => {
    mutate({
      variables: {
        input: {
          ...data,
        },
      },
    });
  };

  const isValid = watch("email") === "" || watch("password") === "";

  const style = {
    type: `flex justify-center items-center mt-1 rounded-sm text-white font-light text-sm py-1 focus:outline-none cursor-pointer ${
      isValid ? "bg-slate-300 text-gray-400" : "bg-stone-800"
    }`,
  };

  return (
    <Layout isAuthPage seoTitle="Login">
      <div className="pb-80">
        <div className="flex justify-center items-center pt-20 pb-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-28 w-28"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
            <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
          </svg>
        </div>
        <div className="flex justify-center items-center pb-16">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col w-64"
          >
            <input
              type="email"
              className="py-1 px-1 focus:outline-none text-sm border-b-[1px]"
              placeholder="Email"
              {...register("email", { required: true })}
              autoComplete="off"
            />
            <input
              type="password"
              className="py-1 px-1 focus:outline-none text-sm"
              placeholder="Password"
              {...register("password", { required: true })}
              autoComplete="off"
            />
            <button type={"submit"} className={style.type}>
              {loading ? <LoadingSpiner /> : "로그인"}
            </button>
            <div className="flex justify-center items-center py-5">
              {errors.stateError && (
                <span className="text-sm font-semibold text-red-600">
                  {errors.stateError.message}
                </span>
              )}
            </div>
          </form>
        </div>
        <div className="flex justify-center">
          <Link href={"/create-account"}>
            <a>
              <span className="text-xs cursor-pointer text-stone-600">
                카카오 계정 만들기
              </span>
            </a>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
