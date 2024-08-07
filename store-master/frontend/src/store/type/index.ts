export interface UploadImageResponse {
  image_id: string;
}

export interface Artifact {
  id: string;
  caption: string;
}

export interface Listing {
  id: string;
  name: string;
  user_id: string;
  child_ids: string[];
  artifact_ids: string[];
  description?: string;
}

export interface NewListing {
  name: string;
  description?: string;
  artifact_ids: string[];
  child_ids: string[];
}

export interface GithubAuthResponse {
  api_key: string;
}

export interface MeResponse {
  user_id: string;
  email: string;
  username: string;
  admin: boolean;
}

export interface ImageUploadState {
  selectedFile: File | null;
  compressedFile: File | null;
  uploadStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  uploadedImageId: string | null;
  fileError: string | null;
}

export interface ListingState {
  name: string;
  description: string;
  artifacts: Artifact[];
  child_ids: string[];
  message: string;
  isLoading: boolean;
}

export interface EditListingState {
  name: string;
  description: string;
  artifacts: Artifact[];
  listing_id: string;
  child_ids: string[];
  loading: boolean;
  error: string | null;
}

// const [message, setMessage] = useState<string>("");
//   const [name, setName] = useState<string>("");
//   const [Listing_description, setDescription] = useState<string>("");
//   const [artifacts, setArtifacts] = useState<Artifact[]>([]);
//   const [Listing_id, setListingId] = useState<string>("");
//   const [child_ids, setChildIds] = useState<string[]>([]);

export interface ListingsState {
  listings: Listing[];
  moreListings: boolean;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}