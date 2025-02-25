import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { ListBox, Option } from 'react-aria-components';

type FormValues = {
  fruit: string;
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

export function SingleSelectForm() {
  const { handleSubmit, control, watch } = useForm<FormValues>({
    defaultValues: { fruit: '' },
  });

  const onSubmit = (data: FormValues) => {
    console.log('Selected fruit:', data.fruit);
  };

  // watch で現在選択中の値を取得
  const selectedFruit = watch('fruit');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4">
      {/* 選択状態の表示 */}
      <div className="mb-4">
        Selected:{' '}
        {selectedFruit
          ? options.find((o) => o.key === selectedFruit)?.name
          : 'None'}
      </div>

      {/* React Hook Form と連携 */}
      <Controller
        name="fruit"
        control={control}
        render={({ field }) => (
          <ListBox
            selectionMode="single"
            aria-label="Select a fruit"
            selectedKey={field.value || undefined}
            onSelectionChange={(key: string) => field.onChange(key)}
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

      <button
        type="submit"
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Submit
      </button>
    </form>
  );
}
