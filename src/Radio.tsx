import React from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Radio } from "react-aria-components";

// zodスキーマ：選択時は "checked" になる
const schema = z.object({
  singleRadio: z.literal("checked").optional(),
});

type FormData = z.infer<typeof schema>;

const SingleRadioForm: React.FC = () => {
  const { control, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { singleRadio: undefined },
  });

  const onSubmit = (data: FormData) => {
    console.log("現在の状態:", data.singleRadio === "checked" ? "選択済み" : "未選択");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="singleRadio"
        control={control}
        render={({ field }) => (
          <Radio
            {...field}
            value="checked"
            checked={field.value === "checked"}
            // クリック時にトグル動作：既に選択中なら解除、そうでなければ選択
            onChange={() => field.onChange(field.value === "checked" ? undefined : "checked")}
            aria-label="単体ラジオボタン"
          >
            単体ラジオ
          </Radio>
        )}
      />
      <button type="submit">送信</button>
    </form>
  );
};

export default SingleRadioForm;
