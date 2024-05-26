import React, { useState, useEffect, useRef } from "react";
import { Howl } from "howler";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import FastRewindIcon from "@mui/icons-material/FastRewind";
import FastForwardIcon from "@mui/icons-material/FastForward";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";

import Slider from "@mui/material/Slider";
import { useRecoilState } from "recoil";
import {
  generateMusic,
  muiscInfo,
  musicIndex,
} from "@/helper/middlewareStates";

import { useForm } from "react-hook-form";
import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Grid,
  Input,
  TextField,
  IconButton,
  Typography,
  useMediaQuery,
  CardMedia,
} from "@mui/material";
import { useRouter } from "next/router";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import axios from "axios";
// import { ReactMic } from "react-mic";
import SettingsVoiceIcon from "@mui/icons-material/SettingsVoice";
import DeleteIcon from "@mui/icons-material/Delete";
import GraphicEqIcon from "@mui/icons-material/GraphicEq";
import { EditChips, EndPoint } from "@/helper/constants";
import { formatTime, showAlert, uploadFileToCloudnariy } from "@/helper/helper";

interface AudioType {
  volume: (newVolume: number) => void;
  seek: () => number; // Assuming seek returns a number
  duration: () => number; // Assuming duration returns a number
  // Add other properties and methods of your audio object
}

const MusicPlayer = ({
  musicData,
  setGeneratedMusic,
  setGeneratedMusicCounter,
  generatedMusicCounter,
  setAiGeneratedMusics,
  aiGeneratedMusics,
  setLoading,
  loading,
}: any) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    mode: "onBlur",
  });

  const router = useRouter();
  const [isPlaying, setIsPlaying] = useState(false);
  const [totalDuration, setTotalDuration] = useState(0);
  const [runningDuration, setRunningDuration] = useState(0);

  const [volume, setVolume] = useState(0.5);
  const [seek, setSeek] = useState(0);
  const soundRef :any  = useRef<AudioType>(null);

  const [selectedChips, setSelectedChips] = useState<any>([]);

  const [currentSongIndex, setCurrentSongIndex] = useRecoilState(musicIndex);

  const currentSong = musicData[currentSongIndex];

  const [isRecording, setIsRecording] = useState(false);
  const [audioBlobUrl, setAudioBlobUrl] = useState<string | null>(null);

  

  const selectCategory = (data: any) => {
    
    if (selectedChips.name == data.name)
      showAlert(`${data.name} already Selected!`);
    else {
      // const response :any = {duration: musicParams.duration , prompt:[categoryChips]}
      setSelectedChips(data);
    }
  };
  const handleEdit = async (data: any) => {
    
    setGeneratedMusic('')
    try {
      setLoading(true);

      const request = {
        preset: selectedChips.id,
        level: data,
        url: `${musicData}`,
      };
      

      const result = await axios.post(`${EndPoint}/edit`, request);
      if (result?.status == 201 || result?.status == 200) {
        setLoading(false);
        setGeneratedMusic(result?.data?.content[0]);
        setGeneratedMusicCounter(aiGeneratedMusics?.length + 1);
        const songObj = {
          src: result?.data?.content[0],
          singer: "AI",
          img: "../../../images/img5.jpg",
          songName: `AI Generated Song ${aiGeneratedMusics?.length + 1}`,
        };

        setAiGeneratedMusics([...aiGeneratedMusics, songObj]);
      }
    } catch (error: any) {
      console.log("Internal Server Error", error);
    } finally {
      setLoading(false);      
    }
  };

  // download audio
  const handleDownload = async () => {
    try {
      setLoading(true);
      const response = await fetch(musicData); // Assuming musicData[0] is the URL of the audio file
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "downloaded_music.mp3"; // specify the desired filename
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error downloading audio:", error);
    }
  };

  // Voice recording handlers
  const handleRecording = async () => {
    setIsRecording(!isRecording);
  };

  const stopRecording = () => {
    setIsRecording(false);
    setAudioBlobUrl(null);
  };

  const onData = async (recordedBlob:any) => {
    const file = new File([recordedBlob.blob], "test.wav", { lastModified: Date.now() });  
    const recordedAudio = await uploadFileToCloudnariy(file);    
    setGeneratedMusic('')
    try {
      setLoading(true);
      const payload = {
        recorded_audio: recordedAudio.split('.webm')[0] + ".wav",
        generated_music: musicData,
        controlling_factor: 0.4,
      };      

      const result = await axios.post(`${EndPoint}/merge`, payload);
      if (result?.status == 200  || result?.status == 201 ) {
        setLoading(false);
        setGeneratedMusic(result?.data?.content);
        setGeneratedMusicCounter(generateMusic?.length + 1);
        const songObj = {
          src: result?.data?.content[0],
          singer: "AI",
          img: "../../../images/img5.jpg",
          songName: `AI Generated Song ${generatedMusicCounter}`,
        };

        setAiGeneratedMusics([...aiGeneratedMusics, songObj]);
      }
    } catch (error: any) {
      setLoading(false);
      console.log("Internal Server Error", error);
    }
  };

  const volumeChangeHandler = (e: any) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (soundRef.current) {
      soundRef?.current?.volume(newVolume);
    }
  };

  const seekChangeHandler = (e: any) => {
    const newSeek = parseFloat(e.target.value);
    setSeek(newSeek);
    if (soundRef.current) {
      soundRef.current.seek(newSeek * soundRef.current.duration());
    }
  };

  const playPauseHandler = () => {
    setIsPlaying(!isPlaying);
  };

  const playRecordedAudio = () => {
    if (audioBlobUrl) {
      const audio = new Audio(audioBlobUrl);
      audio.play();
    }
  };

  const songEndHandler = () => {
    setIsPlaying(false)
  };

  useEffect(() => {
    if (isPlaying) {
      const sound = new Howl({
        src: musicData, 
        volume,
        // onend: nextSongHandler,
        onend: songEndHandler,
      });

      soundRef.current = sound;

      sound.once("load", () => {
        setTotalDuration(sound.duration());
      });

      sound.play();

      sound.on("play", () => {
        requestAnimationFrame(updateSeek);
      });

      return () => {
        sound.unload();
      };
    }
  }, [currentSong, isPlaying, musicData]);

  const updateSeek = () => {
    if (soundRef.current) {
      const currentSeek = soundRef.current.seek();
      setSeek(currentSeek / soundRef.current.duration());
      setRunningDuration(currentSeek);
      if (isPlaying) {
        requestAnimationFrame(updateSeek);
      }
    }
  };
  
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card
            sx={{
              background: "rgba(0, 0, 0, 0.2)",
              backdropFilter: "blur(10px)",
            }}
          >
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  "@media (max-width: 767px)": {
                    flexDirection: "column",
                  },
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={"../../../images/img6.jpg"}
                    width={60}
                    height={60}
                    style={{ borderRadius: "5px" }}
                  />
                  <div>
                    {/* <IconButton>
                      <FavoriteBorderOutlinedIcon
                        sx={{ color: "#ddd", fontSize: "20px" }}
                      />
                    </IconButton> */}
                    <IconButton onClick={handleDownload}>
                      <FileDownloadIcon
                        sx={{ color: "#ddd", fontSize: "20px" }}
                      />
                    </IconButton>
                    {/* voice record */}
                    <IconButton onClick={handleRecording}>
                      {!isRecording ? (
                        <KeyboardVoiceIcon
                          sx={{ color: "#ddd", fontSize: "20px" }}
                        />
                      ) : (
                        <GraphicEqIcon
                          sx={{ color: "#ddd", fontSize: "20px" }}
                        />
                      )}
                    </IconButton>
                    <IconButton onClick={stopRecording}>
                      {isRecording && (
                        <DeleteIcon sx={{ color: "#ddd", fontSize: "20px" }} />
                      )}
                    </IconButton>
                  </div>
                  {/* <ReactMic
                    record={isRecording}
                    className="sound-wave"
                    onStop={onData}
                    strokeColor="#EE4950"
                    backgroundColor="transparent"
                    width={40}
                    sampleRate={16000}
                  /> */}
                </Box>
                {/* play */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <IconButton onClick={playPauseHandler}>
                    {isPlaying ? (
                      <PauseCircleIcon
                        sx={{ color: "#EE4950", fontSize: "3rem" }}
                      />
                    ) : (
                      <PlayCircleIcon
                        sx={{ color: "#EE4950", fontSize: "3rem" }}
                      />
                    )}
                  </IconButton>
                  <Box
                    sx={{
                      width: 300,
                      display: "flex",
                      // justifyContent: "center",
                      // textAlign: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{ color: "#A1A1AA", fontSize: "12px", mr: 2 }}
                    >
                      {formatTime(runningDuration)}
                    </Typography>
                    {/* <Slider
                  size="small"
                  aria-label="Small"
                  sx={{ color: "#EE4950" }}
                  step={0.01}
                  min={0}
                  max={1}
                  value={seek}
                  onChange={seekChangeHandler}
                /> */}

                    <input
                      id="seek"
                      type="range"
                      min={0}
                      max={1}
                      step={0.01}
                      value={seek}
                      onChange={seekChangeHandler}
                      style={{
                        width: 500,
                        height: "2px",
                        backgroundColor: "#EE4950",
                        color: "#EE4950",
                        border: "none",
                        outline: "none",
                        WebkitAppearance: "none",
                      }}
                    />
                    <Typography
                      sx={{ color: "#A1A1AA", fontSize: "12px", ml: 2 }}
                    >
                      {formatTime(totalDuration)}
                    </Typography>
                  </Box>
                </Box>
                {/* vloume */}
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Box>
                    {volume == 0 ? (
                      <IconButton onClick={() => setVolume(0.5)}>
                        <VolumeOffIcon
                          sx={{ color: "#ddd", mb: 1, fontSize: "1.3rem" }}
                        />
                      </IconButton>
                    ) : (
                      <IconButton onClick={() => setVolume(0)}>
                        <VolumeUpIcon
                          sx={{ color: "#ddd", mb: 1, fontSize: "1.3rem" }}
                        />
                      </IconButton>
                    )}
                  </Box>

                  <Box sx={{ width: 150 }}>
                    <Slider
                      size="small"
                      defaultValue={50}
                      aria-label="Small"
                      sx={{ color: "#EE4950" }}
                      min={0}
                      max={1}
                      step={0.01}
                      value={volume}
                      onChange={volumeChangeHandler}
                    />
                    {/* <input
                id="volume"
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={volumeChangeHandler}
              /> */}
                  </Box>
                </Box>
              </Box>
              <Box>
                {EditChips.map((item:any) => (
                  <>
                    <Chip
                      sx={{
                        color: selectedChips.name == item.name
                          ? "#EE4950"
                          : "#fff",
                        borderColor: selectedChips.name == item.name
                          ? "#EE4950"
                          : "#fff",
                        borderRadius: 1,
                        m: "8px 10px 8px 0px",
                        cursor: "pointer",
                      }}
                      onClick={() => selectCategory(item)}
                      label={item.name}
                      variant="outlined"
                    />
                  </>
                ))}
              </Box>
              <Box>
                {selectedChips.type &&
                  selectedChips.type.map((item:any, index:any) => (
                    <Chip
                      sx={{
                        color: "#fff",
                        borderRadius: 1,
                        m: "8px 10px 8px 0px",
                        cursor: "pointer",
                      }}
                      onClick={() => handleEdit(item)}
                      label={item}
                      variant="outlined"
                      // onDelete={() => handleDeleteChip(item)}
                      // deleteIcon={
                      //   <CloseIcon
                      //     style={{
                      //       color: "#f5f5f5",
                      //       paddingLeft: 1,
                      //       fontSize: "14px",
                      //     }}
                      //   />
                      // }
                    />
                  ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default MusicPlayer;
