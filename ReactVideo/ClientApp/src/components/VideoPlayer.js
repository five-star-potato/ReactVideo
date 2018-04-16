import React, { Component } from 'react';

export default class VideoPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            srcList: this.props.srcList,
            durations: [],
            thumbPos: 0
        };
    }
    playNextVideo = (n, pos) => {
        this.setState({ videoIndex: n})
        this.state.srcList.forEach((f, index) => {
            if (index != n) {
                let vid = this.refs["vidRef" + index];
                vid.pause();
                vid.style.display = "none"
            }
        });
        let nextVid = this.refs["vidRef" + n]
        nextVid.style.display = ""
        nextVid.currentTime = (pos || 0)
        nextVid.muted = false
        nextVid.play()
    }
    playVideo = () => {
        let totalDur = this.state.durations.reduce((a, b) => a + b, 0)
        let pos = (this.state.thumbPos / 100) * totalDur
        //if (!pos) 
        //    this.playFirstVideo()
        //else 
        for (let i = 0; i < this.state.durations.length; i++) {
            let dur = this.state.durations[i]
            if (pos < dur) {
                // play this video
                this.playNextVideo(i, pos)
                return
            }
            pos -= dur
        }
    }
    //playFirstVideo = () => {
    //    this.state.srcList.map((f, index) => {
    //        this.refs["vidRef" + index].play();
    //        this.refs["vidRef" + index].muted = true;
    //    });
    //    this.refs["vidRef0"].muted = false;
    //    setTimeout(function () {
    //        // preload 10s for the rest of the videos by play and pause
    //        this.state.srcList.map((f, index) => {
    //            if (index > 0)
    //                this.refs["vidRef" + index].pause();
    //        });
    //    }.bind(this), 10000);
    //}
    sliderChange = (event) => {
        var durs = this.state.durations
        console.log(durs)
        console.log("slider: " + event.target.value)
        this.setState({ thumbPos: event.target.value })
        this.playVideo()
    }
    render() {
        return (
            <div>
                <h1>Play Video</h1>
                {
                    this.state.srcList.map((fileUri, index) => {
                        return <video width="600" ref={"vidRef" + index} key={"vidRef" + index} controls
                            src={fileUri + "&accessKey=123"} type="video/mp4" style={{ display: index > 0 ? 'none' : '' }}
                            onEnded={() => {
                                this.playNextVideo(index + 1);
                            }}
                            onTimeUpdate={() => {
                                this.setState({ videoTime: this.refs["vidRef" + index].currentTime })
                            }}
                            onDurationChange={(event) => {
                                let vid = this.refs["vidRef" + index]
                                if (vid) {
                                    //console.log("duration: " + vid.duration)
                                    let durs = this.state.durations.concat(vid.duration)
                                    this.setState({ durations: durs })
                                }
                            }}
                        />
                    })
                }
                <div>{this.state.videoDuration}</div>
                <br/>
                <button onClick={this.playVideo}>PLAY</button><br />
                <input ref="slider" type="range" min="0" max="100" value={this.state.thumbPos} onChange={this.sliderChange} style={{ width: this.props.width }} />
                <div ref="sliderOutput">{this.state.thumbPos}</div>
                <div>{"Video #:" + this.state.videoIndex + " --> " + this.state.videoTime}</div>
                <svg version="1.1"
                    baseProfile="full"
                    width="300" height="200"
                    xmlns="http://www.w3.org/2000/svg">
                    <rect width="100%" height="100%" fill="red" />
                    <circle cx="150" cy="100" r="80" fill="green" />
                    <text x="150" y="125" fontSize="60" textAnchor="middle" fill="white">SVG</text>
                </svg>
            </div>
        );
    }
}
