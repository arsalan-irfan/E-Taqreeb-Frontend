import React, { useState } from "react";
import DashboardHeader from "../../components/DashboardHeader/PhotographerDashboardHeader";
import { connect } from "react-redux";
import { updateLogo, uploadAllImages } from "../../actions/photographer";

const AddImage = (props) => {
  const [imageData, setImageData] = useState({
    dumb: "sometg",
    file: [],
    imageFiles: [],
  });
  const [image, setImage] = useState(null);

  const uploadedImage = React.useRef(null);
  const imageUploader = React.useRef(null);

  const { file, dumb } = imageData;

  const onLogoChange = (e) => {
    props.updateLogo(e.target.files[0]);
  };

  const uploadAllImages = async () => {
    await props.uploadAllImages(imageData.imageFiles);
    removeAllImages();
  };

  const onChange = (event) => {
    if (event.target.files[0]) {
      console.log("formData before change", imageData);
      const image = URL.createObjectURL(event.target.files[0]);
      let imageFiles = imageData.imageFiles;
      imageFiles.push(event.target.files[0]);

      setImageData((imageData) => ({
        ...imageData,
        file: [...imageData.file, image],
        imageFiles: imageFiles,
      }));
      //  setImageCollection([...imageCollection, event.target.files[0]])
      //    console.log(imageData)
    }
  };
  const removeAllImages = () => {
    setImageData({
      ...imageData,
      file: [],
      imageFiles: [],
    });
  };
  const deletePressed = (n) => {
    console.log(n);
    var arr = file;

    if (n != -1) {
      arr.splice(n, 1);
    }
    setImageData({ ...imageData, file: arr });
  };
  return (
    <div className="iq-card">
      <div className="iq-card-header">
        <DashboardHeader heading="Image Settings" />
      </div>
      <div className="iq-card-body">
        <div>
          <div className="container">
            <label>Upload Logo:</label>

            {/* <div className="col-sm-12"></div> */}
            <div className="form-group row ">
              <div className="align-items-center">
                <div
                  className="profile-img-edit "
                  onClick={() => imageUploader.current.click()}
                >
                  <img
                    className="profile-pic"
                    src={
                      props.business.logo
                        ? props.business.logo
                        : "https://s3-us-west-1.amazonaws.com/s3-lc-upload/assets/default_avatar.jpg"
                    }
                    alt="profile-pic"
                    style={{
                      width: 150,
                      height: 150,
                      // alignItems: "center",
                      // marginLeft: 50,
                    }}
                  />
                  <div className="p-image">
                    <i className="ri-pencil-line upload-button" />
                    <input
                      className="file-upload"
                      type="file"
                      onChange={(e) => {
                        onLogoChange(e);
                      }}
                      accept="image/*"
                      ref={imageUploader}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-4">
                <label>Upload Featured Photos:</label>
                <input
                  type="file"
                  className="form-control"
                  name="file"
                  id="file"
                  accept="image/*"
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div className="col-4">
                {file.length > 0 ? (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignSelf: "flex-start",
                    }}
                  >
                    <button
                      className="btn btn-primary"
                      onClick={uploadAllImages}
                    >
                      Upload All
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        removeAllImages();
                      }}
                    >
                      Remove All
                    </button>
                  </div>
                ) : null}
              </div>
              <div className="col-4"></div>
            </div>

            <div className="row">
              {file.length > 0
                ? file.map((item, n) => {
                    return (
                      <div
                        className="col-sm-6 col-md-4 col-lg-4 "
                        style={{ padding: 10 }}
                        key={n}
                      >
                        <div className="user-images position-relative overflow-hidden">
                          <img
                            src={item}
                            className="img-fluid rounded"
                            alt="Responsive image"
                          />

                          <button
                            onClick={(e) => deletePressed(n)}
                            className="image-edit-btn"
                            data-toggle="tooltip"
                            data-placement="top"
                            title=""
                            data-original-title="Remove"
                          >
                            <b>X</b>
                          </button>
                        </div>
                      </div>
                    );
                  })
                : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  business: state.auth.business,
});

export default connect(mapStateToProps, { updateLogo, uploadAllImages })(
  AddImage
);
