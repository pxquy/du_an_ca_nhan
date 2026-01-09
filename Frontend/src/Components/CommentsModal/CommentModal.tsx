import { useForm } from "react-hook-form";
import { useOpen } from "../../stores/openStore";
import type { TGlobalProps } from "../../Types/React";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Api } from "../../Api/api";
import type { IComments } from "../../Types/comment";
import React, { useEffect, type ReactElement } from "react";
import { QueryKey } from "../../constants/QueryKey";

export const CommentModal = ({
  children,
  comment,
}: TGlobalProps<{ comment: IComments; open: boolean }>) => {
  const { openId, openEdit, setOpenId, setOpenEdit } = useOpen();
  const { register, handleSubmit, reset } = useForm();
  const queryClient = useQueryClient();
  useEffect(() => {
    if (comment) {
      reset({
        title: comment.title,
        content: comment.content,
      });
    }
  }, [comment, reset]);
  const isOpen = openEdit && openId === comment._id;
  const mutation = useMutation({
    mutationFn: async (commentData) => {
      const { data } = await Api.put(`comments/${comment._id}`, commentData);
      return data;
    },
    onSuccess: (comment) => {
      setOpenEdit(false);
      queryClient.invalidateQueries({
        queryKey: [QueryKey.COMMENTS],
      });
      queryClient.setQueryData([QueryKey.COMMENTS], () => {});
    },
  });

  const onSubmit = (data: any) => {
    mutation.mutate(data);
  };

  return (
    <>
      {React.cloneElement(
        children as ReactElement,
        {
          onClick: () => {
            setOpenEdit(true), setOpenId(comment._id);
          },
        } as { onClick: () => void }
      )}
      {isOpen && (
        <section className="fixed top-[15%] left-[35%] w-150 h-125 shadow border border-gray-300 rounded-2xl bg-white overflow-scroll z-30">
          <div>
            <h2 className="text-center p-2 text-2xl font-bold">
              Cập nhật bình luận
            </h2>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="shadow-lg rounded-2xl m-2">
              <p className="p-2 text-gray-500 font-bold">Phần tử chính</p>
              <div className="flex items-center justify-between">
                <div className="flex flex-col m-2 gap-1">
                  <label htmlFor="" className="ml-2">
                    Tiêu đề binh luận(*)
                  </label>
                  <input
                    type="text"
                    {...register("title")}
                    className="border border-gray-400 rounded-2xl p-1 focus:outline-none"
                  />
                </div>
              </div>
            </div>
            <div className="shadow-lg rounded-2xl flex flex-col m-2 gap-1">
              <label htmlFor="" className="ml-2">
                Nội dung
              </label>
              <textarea
                {...register("content")}
                id=""
                rows={4}
                className="p-1 border border-gray-200 focus:outline-none rounded-2xl"
              ></textarea>
            </div>
            <div className="shadow-lg rounded-2xl m-2 pb-5 pt-5 flex gap-3">
              <button
                type="button"
                onClick={() => setOpenEdit(false)}
                className="border border-gray-300 p-3 rounded-2xl cursor-pointer hover:bg-gray-100 ml-5"
              >
                Đóng
              </button>
              <button className="bg-blue-500 text-white p-3 rounded-2xl cursor-pointer hover:bg-blue-600">
                Cập nhật bình luận
              </button>
            </div>
          </form>
        </section>
      )}
    </>
  );
};
