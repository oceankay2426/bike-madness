import sendRequest from "./send-request";
export default function WishListPage() {
  return (
    <h1>WishList</h1>
  );
}
export async function add(bike) {
  return sendRequest(BASE_URL, 'POST',  bike );
}