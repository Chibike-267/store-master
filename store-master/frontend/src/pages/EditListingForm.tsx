import ListingForm from "components/ListingForm";
import { humanReadableError } from "constants/backend";
import { useAlertQueue } from "hooks/alerts";
//import { api, Artifact, Listing } from "hooks/api";
//import { useAuthentication } from "hooks/auth";
import { useTheme } from "hooks/theme";
import React, { FormEvent, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks/reduxHooks";
import { editListing, getListingById } from "../store/api/index";
import { setName, setDescription, setArtifacts, setChildIds } from '../store/reducers/editListing';
import { Listing } from "../store/type/index";

const EditListingForm: React.FC = () => {
  const { theme } = useTheme();
  //const auth = useAuthentication();
  //const auth_api = new api(auth.api);
  const dispatch = useAppDispatch();
  // Parse the ID from the URL.
  const { id } = useParams();
  
  const { name, description, artifacts, listing_id, child_ids, error, loading } = useAppSelector((state) => state.editListing);
  const { addAlert } = useAlertQueue();

  useEffect(() => {
      try {
        if (id) {
          dispatch(getListingById(id));
        }
      } catch (err) {
        addAlert(humanReadableError(err), "error");
      }
  }, [id, dispatch, addAlert]);

  const navigate = useNavigate();
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (artifacts.length === 0) {
      addAlert("Please upload at least one image.", "error");
      return;
    }
    const newFormData: Listing = {
      id: listing_id,
      name: name,
      description: description,
      user_id: "",
      artifact_ids: artifacts.map(a => a.id),
      child_ids: [],
    };
    try {
      const resultAction = await dispatch(editListing(newFormData));
      if (editListing.fulfilled.match(resultAction)) {
        addAlert("Listing edited successfully.", "success");
        navigate(`/listings/me/1`);
      }
    } catch (error) {
      addAlert("Error adding part ", "error");
    }
  };

  return (
    <ListingForm
      theme={theme}
      title="Edit Listing"
      message={error || ""}
      name={name}
      setName={value => dispatch(setName(value))}
      description={description}
      setDescription={value => dispatch(setDescription(value))}
      artifacts={artifacts}
      setArtifacts={value => dispatch(setArtifacts(value))}
      child_ids={child_ids}
      setChildIds={value => dispatch(setChildIds(value))}
      handleSubmit={handleSubmit}
      isLoading={loading}
    />
  );
};

export default EditListingForm;
