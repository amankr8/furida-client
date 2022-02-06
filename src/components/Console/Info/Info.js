import React from 'react'
import ArrowLeft from '../../modules/ArrowLeft/ArrowLeft'

const Info = () => {
    return (
        <div>
            <ArrowLeft />
            <div className="container border rounded my-4 pt-5 pb-3 shadow bg-light">
                <h4 className="text-center mb-3">INFO PANEL</h4>
                <form>
                    <div class="form-group">
                        <label for="exampleFormControlInput1">Heading</label>
                        <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Heading" value="FURIDA"></input>
                    </div>
                    <div class="form-group">
                        <label for="exampleFormControlInput2">Sub-Heading</label>
                        <input type="text" class="form-control" id="exampleFormControlInput2" placeholder="Sub-Heading" value="Non-Governmental Organisation (NGO) in Jamshedpur"></input>
                    </div>
                    <div class="form-group">
                        <label for="exampleFormControlFile1">Cover Photo</label>
                        <input type="file" class="form-control-file" id="exampleFormControlFile1"></input>
                    </div>
                    <button type="submit" class="btn btn-danger btn-block">Save Changes</button>
                </form>
            </div>
        </div>
    )
}

export default Info
