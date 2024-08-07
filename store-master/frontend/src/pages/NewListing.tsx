import ListingForm from "components/ListingForm";
import { useTheme } from "hooks/theme";
import React, { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { addListing } from "../store/api/index";
import { useAppDispatch, useAppSelector } from "../store/hooks/reduxHooks";
import {  
  setName, 
  setDescription, 
  setArtifacts, 
  setChildIds,
  setMessage,  
} from '../store/reducers/newListing';

const NewListing: React.FC = () => {
  const dispatch = useAppDispatch();
  const { name, description, artifacts, child_ids, message, isLoading } = useAppSelector(state => state.newListing);
  const navigate = useNavigate();
  const { theme } = useTheme();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (artifacts.length === 0) {
      dispatch(setMessage("Please upload at least one image."));
      return;
    }

    const result = await dispatch(addListing({
      name,
      description,
      artifact_ids: artifacts.map((artifact) => artifact.id),
      child_ids,
    }));

    if (addListing.fulfilled.match(result)) {
      navigate("/listings/me/1");
    }
  };

  return (
    <ListingForm
      theme={theme}
      title="Add a New Listing"
      message={message}
      name={name}
      setName={(value) => dispatch(setName(value))}
      description={description}
      setDescription={(value) => dispatch(setDescription(value))}
      artifacts={artifacts}
      setArtifacts={(value) => dispatch(setArtifacts(value))}
      child_ids={child_ids}
      setChildIds={(value) => dispatch(setChildIds(value))}
      handleSubmit={handleSubmit}
      isLoading={isLoading}
    />
  );
};

export default NewListing;
