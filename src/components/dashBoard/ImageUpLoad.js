import React from 'react';

class ImageUpLoad extends React.Component {

    render() {
        const { handleImageUpload, handleImageUpload1, handleImageUpload2, handleImageUpload3, handleImageUpload4 } = this.props;
        return <div >
                <div className="dashboard-main">
                    <span className="title-filter">Upload Your Profile Picture</span><br/>
                        <div className="form-group image-upload">
                            <input
                                onChange={handleImageUpload}
                                type="file"
                                className="form-control-file mb2"
                            />
                    </div>
                </div>
                <div className="dashboard-main">
                    <span className="title-filter">Upload Picture 1</span><br/>
                        <div className="form-group image-upload">
                            <input
                                onChange={handleImageUpload1}
                                type="file"
                                className="form-control-file mb2"
                            />
                    </div>
                </div>
                <div className="dashboard-main">
                    <span className="title-filter">Upload Picture 2</span><br/>
                        <div className="form-group image-upload">
                            <input
                                onChange={handleImageUpload2}
                                type="file"
                                className="form-control-file mb2"
                            />
                    </div>
                </div>
                <div className="dashboard-main">
                    <span className="title-filter">Upload Picture 3</span><br/>
                        <div className="form-group image-upload">
                            <input
                                onChange={handleImageUpload3}
                                type="file"
                                className="form-control-file mb2"
                            />
                    </div>
                </div>
                <div className="dashboard-main">
                    <span className="title-filter">Upload Picture 4</span><br/>
                        <div className="form-group image-upload">
                            <input
                                onChange={handleImageUpload4}
                                type="file"
                                className="form-control-file mb2"
                            />
                    </div>
                </div>
            </div>
    }
}

export default ImageUpLoad;