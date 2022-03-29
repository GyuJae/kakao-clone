import type { NextPage } from "next";
import Layout from "@components/Layout";
import Avatar from "@components/Avatar";
import useUser from "@libs/client/hooks/useUser";
import { SubmitHandler, useForm } from "react-hook-form";
import { fileToUrl } from "@libs/client/utils";
import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { EDIT_PROFIEL_MUTATION } from "@libs/server/mutations/edit-profile.gql";
import {
  editProfile,
  editProfileVariables,
} from "@libs/server/mutations/__generated__/editProfile";
import { useRouter } from "next/router";

interface IEditProfile {
  name?: string;
  avatar?: FileList;
  statusMessage?: string;
}

const Profile: NextPage = () => {
  const { data: user } = useUser();
  const router = useRouter();
  const { register, handleSubmit, setValue, watch, reset } =
    useForm<IEditProfile>();
  const [editProfileMutate, { loading: editProfileLoading }] = useMutation<
    editProfile,
    editProfileVariables
  >(EDIT_PROFIEL_MUTATION, {
    onCompleted: ({ editProfile: { ok } }) => {
      if (ok) {
        router.replace("/user");
      }
    },
  });

  const onSubmit: SubmitHandler<IEditProfile> = async ({
    avatar,
    name,
    statusMessage,
  }) => {
    if (avatar && avatar.length > 0) {
      const { uploadURL } = await (await fetch("/api/file")).json();
      const form = new FormData();
      form.append("file", avatar[0], user?.whoAmI.id + "-avatar");
      const {
        result: { id },
      } = await (
        await fetch(uploadURL, {
          method: "POST",
          body: form,
        })
      ).json();
      editProfileMutate({
        variables: { input: { name, avatar: id, statusMessage } },
      });
    } else {
      editProfileMutate({
        variables: { input: { name, statusMessage } },
      });
    }
  };
  const [avatarPreview, setAvatarPreview] = useState<string | null>(
    user?.whoAmI?.avatar
      ? fileToUrl({ fileId: user?.whoAmI?.avatar, variant: "avatar" })
      : null
  );

  const avatar = watch("avatar");
  useEffect(() => {
    if (avatar && avatar.length > 0) {
      const file = avatar[0];
      setAvatarPreview(URL.createObjectURL(file));
    }
  }, [avatar]);

  useEffect(() => {
    if (user?.whoAmI.name) setValue("name", user.whoAmI.name);
    if (user?.whoAmI.statusMessage)
      setValue("statusMessage", user.whoAmI.statusMessage);
  }, [setValue, user?.whoAmI.name, user?.whoAmI.statusMessage]);

  const nameLength = watch("name")?.length;
  const statusMessageLength = watch("statusMessage")?.length;

  return (
    <Layout seoTitle="Profile">
      <form onSubmit={handleSubmit(onSubmit)} className="py-4">
        <h1 className="text-xl font-semibold">프로필 관리</h1>
        <div className="flex justify-center items-center mt-5">
          <div className="flex justify-center items-center space-x-3">
            <label htmlFor="avatar" className="cursor-pointer relative">
              <div className="absolute right-0 bottom-0 text-gray-700 bg-gray-50 p-1 rounded-full border-[1px] shadow-sm z-10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <Avatar
                size="EDIT"
                avatar={user?.whoAmI.avatar}
                previewAvatar={avatarPreview}
              />
            </label>
            <input
              id="avatar"
              className="hidden"
              type="file"
              accept="image/*"
              {...register("avatar")}
            />
          </div>
        </div>
        <div className="flex flex-col mt-5 space-y-7 w-full">
          <div className="flex relative">
            <input
              placeholder="이름"
              className="focus:outline-none w-full border-b-2 text-sm py-1 focus:border-black"
              {...register("name", { maxLength: 20, required: true })}
              maxLength={20}
            />
            <div className="text-xs text-gray-500 absolute right-0 bottom-1">
              {nameLength} / 20
            </div>
          </div>
          <div className="flex relative">
            <input
              placeholder="상태메세지"
              className="focus:outline-none w-full border-b-2 text-sm py-1 focus:border-black"
              {...register("statusMessage", { maxLength: 60 })}
              maxLength={60}
            />
            <div className="text-xs text-gray-500 absolute right-0 bottom-1">
              {statusMessageLength} / 60
            </div>
          </div>
        </div>
        <div className="flex mt-10 justify-end w-full space-x-3">
          <button
            type="submit"
            className="py-1 px-3 bg-yellow-300 hover:bg-yellow-400 rounded-sm text-sm"
          >
            확인
          </button>
          <button
            onClick={() => {
              reset();
              if (user?.whoAmI.name) setValue("name", user.whoAmI.name);
              if (user?.whoAmI.statusMessage)
                setValue("statusMessage", user.whoAmI.statusMessage);
            }}
            className="py-1 px-3 border-[1px] hover:bg-gray-100 rounded-sm text-sm"
          >
            취소
          </button>
        </div>
      </form>
    </Layout>
  );
};

export default Profile;
