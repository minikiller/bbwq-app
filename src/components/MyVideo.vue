<template>
  <div>
    <div id="videos_container" ref="videos_container"></div>
    <button aria-pressed="true" class="btn btn-primary" @click="play">play</button>
  </div>
</template>
<script>
import { connection } from "../_helpers";
import { mapState, mapMutations } from "vuex";

export default {
  props: {
    gameId: String,
    gameInfo: null
  },
  computed: {
    ...mapState({
      account: state => state.account
    })
  },
  data() {
    return {
      _con: null
    };
  },
  methods: {
    play() {
      // this._con.userid = this.account.user.name;
      this._con.openOrJoin(this.gameId, (isRoomJoined, roomid, error) => {
        // console.log(isRoomJoined, roomid, error);
      });
    }
  },
  mounted() {
    // connection.videosContainer = this.$refs.videos_container;
    var connection = new RTCMultiConnection();
    this._con = connection;

    // by default, socket.io server is assumed to be deployed on your own URL
    // connection.socketURL = "https://192.168.1.34:9001/";
    connection.socketURL = "https://bibiweiqi.com:9001/";
    // connection.socketURL = "https://rtcmulticonnection.herokuapp.com:443/";

    // comment-out below line if you do not have your own socket.io server
    // connection.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/';

    connection.socketMessageEvent = "video-conference-demo";
    // connection.changeUserId(username);
    connection.session = {
      audio: true,
      video: true
    };

    connection.sdpConstraints.mandatory = {
      OfferToReceiveAudio: true,
      OfferToReceiveVideo: true
    };

    // STAR_FIX_VIDEO_AUTO_PAUSE_ISSUES
    // via: https://github.com/muaz-khan/RTCMultiConnection/issues/778#issuecomment-524853468
    var bitrates = 512;
    var resolutions = "HD";
    // var resolutions = "Ultra-HD";

    var videoConstraints = {};

    if (resolutions == "HD") {
      videoConstraints = {
        width: {
          ideal: 1280
        },
        height: {
          ideal: 720
        },
        frameRate: 30
      };
    }

    if (resolutions == "Ultra-HD") {
      videoConstraints = {
        width: {
          ideal: 1920
        },
        height: {
          ideal: 1080
        },
        frameRate: 30
      };
    }

    connection.mediaConstraints = {
      video: videoConstraints,
      audio: true
    };

    var CodecsHandler = connection.CodecsHandler;

    connection.processSdp = function(sdp) {
      var codecs = "vp8";

      if (codecs.length) {
        sdp = CodecsHandler.preferCodec(sdp, codecs.toLowerCase());
      }

      if (resolutions == "HD") {
        sdp = CodecsHandler.setApplicationSpecificBandwidth(sdp, {
          audio: 128,
          video: bitrates,
          screen: bitrates
        });

        sdp = CodecsHandler.setVideoBitrates(sdp, {
          min: bitrates * 8 * 1024,
          max: bitrates * 8 * 1024
        });
      }

      if (resolutions == "Ultra-HD") {
        sdp = CodecsHandler.setApplicationSpecificBandwidth(sdp, {
          audio: 128,
          video: bitrates,
          screen: bitrates
        });

        sdp = CodecsHandler.setVideoBitrates(sdp, {
          min: bitrates * 8 * 1024,
          max: bitrates * 8 * 1024
        });
      }

      return sdp;
    };
    // END_FIX_VIDEO_AUTO_PAUSE_ISSUES

    // https://www.rtcmulticonnection.org/docs/iceServers/
    // use your own TURN-server here!
    connection.iceServers = [
      {
        urls: [
          "stun:stun.l.google.com:19302",
          "stun:stun1.l.google.com:19302",
          "stun:stun2.l.google.com:19302",
          "stun:stun.l.google.com:19302?transport=udp"
        ]
      }
    ];

    connection.videosContainer = document.getElementById("videos_container");
    connection.onstream = function(event) {
      var existing = document.getElementById(event.streamid);
      if (existing && existing.parentNode) {
        existing.parentNode.removeChild(existing);
      }

      event.mediaElement.removeAttribute("src");
      event.mediaElement.removeAttribute("srcObject");
      event.mediaElement.muted = true;
      event.mediaElement.volume = 0;

      var video = document.createElement("video");

      try {
        video.setAttributeNode(document.createAttribute("autoplay"));
        video.setAttributeNode(document.createAttribute("playsinline"));
      } catch (e) {
        video.setAttribute("autoplay", true);
        video.setAttribute("playsinline", true);
      }

      if (event.type === "local") {
        video.volume = 0;
        try {
          video.setAttributeNode(document.createAttribute("muted"));
        } catch (e) {
          video.setAttribute("muted", true);
        }
      }
      video.srcObject = event.stream;

      var width = parseInt(connection.videosContainer.clientWidth / 5) - 20;
      var mediaElement = getHTMLMediaElement(video, {
        title: event.userid,
        buttons: [
          // "mute-audio",
          // "mute-video",
          // "record-audio",
          // "record-video",
          // "full-screen",
          // "volume-slider",
          // "stop",
        ],
        width: width,
        showOnMouseEnter: false
      });

      connection.videosContainer.appendChild(mediaElement);

      setTimeout(function() {
        mediaElement.media.play();
      }, 5000);

      mediaElement.id = event.streamid;

      // to keep room-id in cache
      localStorage.setItem(connection.socketMessageEvent, connection.sessionid);

      chkRecordConference.parentNode.style.display = "none";

      if (chkRecordConference.checked === true) {
        btnStopRecording.style.display = "inline-block";
        recordingStatus.style.display = "inline-block";

        var recorder = connection.recorder;
        if (!recorder) {
          recorder = RecordRTC([event.stream], {
            type: "video"
          });
          recorder.startRecording();
          connection.recorder = recorder;
        } else {
          recorder.getInternalRecorder().addStreams([event.stream]);
        }

        if (!connection.recorder.streams) {
          connection.recorder.streams = [];
        }

        connection.recorder.streams.push(event.stream);
        recordingStatus.innerHTML =
          "Recording " + connection.recorder.streams.length + " streams";
      }

      if (event.type === "local") {
        connection.socket.on("disconnect", function() {
          if (!connection.getAllParticipants().length) {
            location.reload();
          }
        });
      }
    };

    connection.onstreamended = function(event) {
      var mediaElement = document.getElementById(event.streamid);
      if (mediaElement) {
        mediaElement.parentNode.removeChild(mediaElement);
      }
    };

    connection.onMediaError = function(e) {
      if (e.message === "Concurrent mic process limit.") {
        if (DetectRTC.audioInputDevices.length <= 1) {
          alert(
            "Please select external microphone. Check github issue number 483."
          );
          return;
        }

        var secondaryMic = DetectRTC.audioInputDevices[1].deviceId;
        connection.mediaConstraints.audio = {
          deviceId: secondaryMic
        };

        connection.join(connection.sessionid);
      }
    };
  }
};
</script>