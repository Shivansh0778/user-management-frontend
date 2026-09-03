import UserCard from "./UserCard";

const UserList = ({ users, onView, onEdit, onDelete }) => {
  return (
    <div className="flex flex-wrap gap-6">
      {users.map((user) => (
        <UserCard key={user._id} user={user} onView={onView} onEdit={onEdit} onDelete={onDelete}/>
      ))}
    </div>
  );
};

export default UserList;
