type Props = {
  id: string;
  text: string;
  disabled?: boolean;
  loading?: boolean;
  onClick: () => void;
};

const Button = ({ id, text, disabled = false, loading = false, onClick = () => {} }: Props) => {
  return (
    <button
      id={id}
      data-testid={id}
      className="w-full h-10 border-2 border-gray-500 border-solid rounded-md text-white bg-gray-500 text-sm font-bold hover:cursor-pointer hover:opacity-80 disabled:opacity-30 disabled:cursor-not-allowed"
      disabled={disabled}
      onClick={onClick}
    >
      <div className="w-full flex justify-center items-center space-x-4">
        <p>{text}</p>
        {loading && (
          <div id="loading" data-testid="loading" className="w-5 h-5 border-t-transparent border-2 border-white-400 border-solid rounded-full animate-spin"></div>
        )}
      </div>
    </button>
  );
};

export default Button;
