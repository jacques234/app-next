type user = {
  name:string,
  age:number
}

export default async function BlogPage() {
  const data = await fetch("https://6837350f664e72d28e43f650.mockapi.io/api/v1/users");
  const posts = await data.json();
  
  return (
    <ul>
      {posts.map((post: user) => (
        <li key={post.name}>{post.name}</li>
      ))}
    </ul>
  );
}
