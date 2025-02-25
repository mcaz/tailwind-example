import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { ListBox, Option } from 'react-aria-components';

type FormValues = {
  fruits: Set<string>;
};

type OptionItem = {
  key: string;
  name: string;
};

const options: OptionItem[] = [
  { key: 'apple', name: 'Apple' },
  { key: 'banana', name: 'Banana' },
  { key: 'orange', name: 'Orange' },
  { key: 'grape', name: 'Grape' },
];

export function MultiSelectForm() {
  const { handleSubmit, control, watch } = useForm<FormValues>({
    defaultValues: {
      fruits: new Set<string>(),
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log('Selected fruits:', Array.from(data.fruits));
  };

  // フォームの値を監視して、タグ表示用に利用
  const selectedKeys = watch('fruits');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4">
      {/* 選択済みの項目をタグ風に表示 */}
      <div className="flex flex-wrap gap-2 mb-4">
        {Array.from(selectedKeys).map((key) => {
          const option = options.find((o) => o.key === key);
          return (
            <span
              key={key}
              className="px-2 py-1 bg-blue-500 text-white rounded-full text-sm"
            >
              {option?.name}
            </span>
          );
        })}
      </div>

      {/* React Hook Form と連携 */}
      <Controller
        name="fruits"
        control={control}
        render={({ field }) => (
          <ListBox
            selectionMode="multiple"
            aria-label="Select fruits"
            // Controller の値を selectedKeys として渡す
            selectedKeys={field.value}
            // onSelectionChange で新しい Set を field に反映
            onSelectionChange={(keys: Set<string>) => field.onChange(keys)}
            className="border rounded p-2"
          >
            {options.map((option) => (
              <Option
                key={option.key}
                value={option.key}
                className="p-1 hover:bg-gray-200 rounded"
              >
                {option.name}
              </Option>
            ))}
          </ListBox>
        )}
      />

      <button type="submit" className="mt-4 px-4 py-2 bg-green-500 text-white rounded">
        Submit
      </button>
    </form>
  );
}
