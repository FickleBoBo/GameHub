interface ButtonProps {
  onClick: () => void;
  text: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, text }) => (
  <button
    className="w-32 h-16 border-2 border-blue-500 text-blue-500 font-semibold rounded-md flex items-center justify-center hover:bg-blue-500 hover:text-white transition"
    onClick={onClick}
  >
    {text}
  </button>
);

export default Button;
