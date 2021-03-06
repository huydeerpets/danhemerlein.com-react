import React, { Component } from "react";
import { Link } from "react-router-dom";

import get from "utils/get";

import ScrollToTop from 'components/ScrollToTop'
import Image from "components/base/Image";

import "./Moodboard.scss"

export default class Moodboard extends Component {
  renderGalleryRow = (imageGroup, index) => {
    return (
      <div className="Moodboard__content full-width flex mb1" key={index}>
        <div className="flex items-end col-12 md-col-6 mr1">
          <Image src={get(imageGroup, "[0].fields.file.url")} alt={get(imageGroup, "[0].fields.title")} />
        </div>
        <div className="flex items-end col-12 md-col-6">
          <Image src={get(imageGroup, "[1].fields.file.url")} alt={get(imageGroup, "[1].fields.title")} />
        </div>
      </div>
    );
  };

  render() {
    const images = get(this, "props.images", []);

    const imageMatrix = images.reduce(
      (rows, image, index) =>
        (index % 2 === 0
          ? rows.push([image])
          : rows[rows.length - 1].push(image)) && rows,
      []
    );

    return (
      <div className="Moodboard my2 flex flex-wrap">
        {imageMatrix.map((imageGroup, index) =>
          this.renderGalleryRow(imageGroup, index, imageMatrix)
        )}
        <ScrollToTop scrollStepInPx="75" delayInMs="10" />
        <div className="flex justify-center full-width">
          <Link to="/" className="go-home body-serif"> Go Home</Link >
        </div>
      </div>
    );
  }
}
