import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import Profile from "@components/Profile";

const MyProfile = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${router.query.id}/posts`);
      const data = await response.json();

      setPosts(data);
    };

    if (session?.user.id) fetchPosts();
  }, [session, router]);

  return <Profile name="My" desc="Welcome to your profile" data={posts} />;
};

export default MyProfile;
