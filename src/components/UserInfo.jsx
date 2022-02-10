export default function UserInfo({ user }) {
  const { username, avatar_url, name } = user;
  return (
    <div className="UserInfo">
      <img alt={name} src={avatar_url} className="UserInfo__image"></img>
      <div className="UserInfo_names">
        <h1 className="UserInfo__name">{name}</h1>
        <div className="UserInfo__username">{username}</div>
      </div>
    </div>
  );
}
