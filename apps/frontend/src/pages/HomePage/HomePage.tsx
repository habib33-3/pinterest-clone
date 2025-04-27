import { useUserStore } from "@/stores/userStore";

const HomePage = () => {
  const { user } = useUserStore();

  console.info(user);

  return <div>HomePage</div>;
};

export default HomePage;
