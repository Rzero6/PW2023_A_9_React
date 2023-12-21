import {
  Container,
  Stack,
  Button,
  Spinner,
  Alert,
  Card,
  Col,
  Row,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import { getProfilPic } from "../../../api";
import { FaImage, FaPlusSquare } from "react-icons/fa";
import { UpdateProfilPic } from "../../../api/apiUser";
import { GetUserById } from "../../../api/apiUser";
import { toast } from "react-toastify";
import { Loading } from "../../../admin/components/loading/Loading";
import ModalEditProfile from "../Modals/ModalEditProfile";
const ProfileComponents = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isPending, setIsPending] = useState(false);
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user")));
  const [thumbnail, setThumbnail] = useState(null);
  const handleThumbnail = (event) => {
    setThumbnail(event.target.files[0]);
  };
  const fetchUser = () => {
    setIsLoading(true);
    const id = user.id;
    GetUserById(id)
      .then((response) => {
        setUser(response);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        toast.dark(JSON.stringify(err.message));
      });
  };

  const updateProfilPic = () => {
    setIsPending(true);
    const formData = new FormData();
    formData.append("profil_pic", thumbnail);
    UpdateProfilPic(formData)
      .then((response) => {
        setIsLoading(false);
        setIsPending(false);
        toast.success(response.message);
        fetchUser();
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        setIsPending(false);
        toast.dark(JSON.stringify(err.message));
      });
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <Container className="mt-4">
      {isLoading ? (
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ height: "90vh" }}
        >
          <Loading />
        </div>
      ) : (
        <div style={{ height: "80vh" }}>
          <Stack direction="horizontal" gap={3} className="mb-3">
            <h1 className="h4 text-white fw-bold mb-0 text-nowrap">Profil</h1>
            <hr className="border-top border-light opacity-50 w-100" />
          </Stack>
          <Card className="p-3">
            <div className="d-flex justify-content-md-start">
              <div
                className="d-flex img-preview text-center position-relative mb-3"
                style={{ aspectRatio: "16 / 9", maxWidth: "50vh" }}
              >
                {thumbnail ? (
                  <img
                    src={URL.createObjectURL(thumbnail)}
                    alt="Not Found"
                    className="img-fluid object-fit-cover"
                    style={{ width: "400px", height: "300px" }}
                  />
                ) : user.profil_pic.startsWith("http") ? (
                  <img
                    src={user.profil_pic}
                    alt="Not Found"
                    className="img-fluid object-fit-cover"
                    style={{ width: "400px", height: "300px" }}
                  />
                ) : (
                  <img
                    src={getProfilPic(user.profil_pic)}
                    alt="Not Found"
                    className="img-fluid object-fit-cover"
                    style={{ width: "400px", height: "300px" }}
                  />
                )}
                <Button
                  variant="primary"
                  type="button"
                  disabled={isPending}
                  size="sm"
                  className="w-fit h-fit position-absolute bottom-0 end-0 me-3 mb-3"
                  onClick={() => document.getElementById("thumbnail").click()}
                >
                  <FaImage /> Pilih Gambar
                </Button>
                {/* Input type file yang disembunyikan, diakses pakai tombol diatas */}
                <input
                  type="file"
                  name="thumbnail"
                  id="thumbnail"
                  className="d-none"
                  onChange={handleThumbnail}
                  accept="image/*"
                />
              </div>
              <div className="flex-grow-1 px-4">
                <h1>
                  <strong>{user.nama}</strong>
                </h1>
                <p>{user.email}</p>
                <Stack gap={2}>
                  <ModalEditProfile user={user} onClose={fetchUser} />
                  <Button disabled={!thumbnail} onClick={updateProfilPic}>
                    Simpan Gambar
                  </Button>
                </Stack>
              </div>
            </div>
          </Card>
        </div>
      )}
    </Container>
  );
};

export default ProfileComponents;
