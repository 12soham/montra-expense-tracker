// Tracks 'count' internally using useState
function ClickCounter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Total clicks: {count}</p>
      <CustomButton label="Add" onClick={() => setCount(count + 1)} />
    </div>
  );
}