import React, { useState, useRef } from "react"
import Vimeo from "@u-wave/react-vimeo"
import Head from 'next/head'
import NextLink from 'next/link'
import Banner from 'src/components/Banner'
import Search from 'src/components/Search'
import FeatureBlock from 'src/components/FeatureBlock'
import useIsMountedRef from 'src/hooks/useIsMountedRef'
import dynamic from 'next/dynamic'
import { VideoSegmentControls, VideoSegmentProgress } from 'src/components/VideoComponents'
import { useSpring, animated, useTransition } from "react-spring"
import { Transition } from '@headlessui/react'

export default function Home() {
  let isMounted = useIsMountedRef();

  let segments = {
    apiDescription: { start: 0, end: 31.17 },
    apiBuild: { start: 31.17, end: 63.16 },
    apiRun: { start: 63.16, end: 141.19 },
    apiGrow: { start: 141.19, end: 175.14 },
  }
  let videoPlayer = useRef()
  let [currentTime, setCurrentTime] = useState(0)
  let [playerState, setPlayerState] = useState("loading")

  let currentSegment =
    Object.keys(segments).find((name) => {
      let segment = segments[name]
      return segment.start <= currentTime && segment.end > currentTime
    }) || Object.keys(segments)[0]

  function handleTimeUpdate(event) {
    setCurrentTime(event.seconds)
  }

  async function seekVideo(time) {
    await videoPlayer.current.player.setCurrentTime(time)
  }

  async function pauseVideo() {
    await videoPlayer.current.player.pause()
    if (isMounted.current) {
      setPlayerState("paused")
    }
  }

  async function playVideo() {
    await videoPlayer.current.player.play()
    if (isMounted.current) {
      setPlayerState("playing")
    }
  }

  return (
    <div >
      <Head>
        <meta
          key="twitter:title"
          name="twitter:title"
          content="Wrapt - Scaffold an entire Web API with a simple yaml file."
        />
        <meta
          key="og:title"
          property="og:title"
          content="Wrapt - Scaffold an entire Web API with a simple yaml file."
        />
        <title>Wrapt - Scaffold an entire .NET 5 Web API with a simple yaml file.</title>
      </Head>

      {/* <Banner /> */}
      <header className="relative z-10 max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl mx-auto">
        <div className="px-4 sm:px-6 md:px-8">
          <div className="border-b border-gray-200 py-4 flex items-center justify-between mb-16 sm:mb-20 -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="flex flex-1 items-center space-x-5 max-w-lg">
              <p className="text-violet-500 w-1/2">Wrapt SVG</p>
              {/* <Search /> */}
            </div>

            <div className="flex space-x-6 sm:space-x-10">
              <NextLink href="/docs/how-it-works">
                <a className="text-base leading-6 font-medium hover:text-gray-600 transition-colors duration-200">
                  Docs
                </a>
              </NextLink>
              <a
                target="_blank"
                href="https://github.com/pdevito3/craftsman"
                className="text-gray-400 hover:text-gray-500 transition-colors duration-200"
              >
                <span className="sr-only">Tailwind CSS on GitHub</span>
                <svg width="24" height="24" viewBox="0 0 16 16" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
                  />
                </svg>
              </a>
            </div>
          </div>
          {/* <Logo className="w-auto h-7 sm:h-8" /> */}
          <div className="text-center w-auto md:w-full">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-gray-900 mt-10 mb-8 sm:mt-14 sm:mb-10">
              Skip the boilerplate and
              <span className="text-violet-700 font-semibold whitespace-pre-wrap"> focus on your business logic.</span>
            </h1>
            <div className="w-full flex items-center justify-center">
              <p className="max-w-lg md:max-w-3xl text-lg sm:text-2xl sm:leading-10 font-medium mb-10 sm:mb-11 ">
                Scaffold an entire .NET 5 Web API with a simple yaml or json file so you can focus on the high value features in your web app.
              </p>
            </div>
          <div className="flex flex-wrap space-y-4 sm:space-y-0 sm:space-x-4 text-center justify-center">
              <NextLink href="/docs/how-it-works">
                <a className="w-full sm:w-auto flex-none bg-violet-700 hover:bg-violet-500 text-white text-lg leading-6 font-semibold py-3 px-6 border border-transparent rounded-xl focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-violet-700 focus:outline-none transition-colors duration-200">
                  Get Started
                </a>
              </NextLink>
              <NextLink href="/docs/tutorial">
                <a className="group w-full sm:w-auto flex-none text-violet-700 text-lg leading-6 font-semibold flex items-center justify-center py-3 px-6 border border-transparent rounded-xl focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-violet-700 focus:outline-none transition-colors duration-200">
                  <span className="group-hover:text-violet-500">
                    Start the Tutorial
                  </span>
                  <span>
                    <svg className="h5 w-5 ml-2 group-hover:text-violet-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </a>
              </NextLink>
              {/* <NpmInstallButton /> */}
            </div>
          </div>
          </div>
        {/* <Hero /> */}
      </header>

    <div className="hidden md:block">
      <div className="md:px-8 mt-16 md:mt-20 2xl:mt-24">
        <div className="max-w-lg mx-auto md:max-w-4xl 2xl:max-w-5xl">
          <AspectRatio ratio={16 / 9}>
            <button
              className="absolute inset-0 z-10 w-full focus:outline-none"
              onClick={() =>
                playerState === "paused" ? playVideo() : pauseVideo()
              }
            />
            <Vimeo
              video="489696849"
              controls={false}
              autoplay={true}
              muted={true}
              loop={true}
              responsive={true}
              onTimeUpdate={handleTimeUpdate}
              ref={videoPlayer}
            />
          </AspectRatio>
        </div>
      </div>

      <Gutters>
        <div className="max-w-lg mx-auto md:max-w-4xl 2xl:max-w-5xl">
          <div className="flex -mx-4">
            <div className="w-1/4 px-4">
              <VideoSegmentProgress
                start={segments.apiDescription.start}
                end={segments.apiDescription.end}
                current={currentTime}
                paused={playerState === "paused"}
              />
            </div>
            <div className="w-1/4 px-4">
              <VideoSegmentProgress
                start={segments.apiBuild.start}
                end={segments.apiBuild.end}
                current={currentTime}
                paused={playerState === "paused"}
              />
            </div>
            <div className="w-1/4 px-4">
              <VideoSegmentProgress
                start={segments.apiRun.start}
                end={segments.apiRun.end}
                current={currentTime}
                paused={playerState === "paused"}
              />
            </div>
            <div className="w-1/4 px-4">
              <VideoSegmentProgress
                start={segments.apiGrow.start}
                end={segments.apiGrow.end}
                current={currentTime}
                paused={playerState === "paused"}
              />
            </div>
          </div>

          <div className="mt-2 md:mt-8 md:hidden">
            <p className="font-medium text-gray-400">
              {currentSegment === "apiDescription"
                ? "Describe your API"
                : currentSegment === "apiBuild"
                ? "Build your API"
                : currentSegment === "apiRun"
                ? "Run your API"
                : "Grow your API"}
            </p>
          </div>

          <div className="hidden mt-3 md:block">
            <div className="flex -mx-4">
              <div className="w-1/4 px-4">
                <button
                  onClick={async (e) => {
                    await seekVideo(segments.apiDescription.start)
                    await playVideo()
                  }}
                  className={`text-center hover:text-violet-500 block w-full focus:outline-none ${
                    currentSegment === "apiDescription"
                      ? "text-violet-500"
                      : "text-gray-700"
                  }`}
                >
                  Describe your API
                </button>

                {currentSegment === "apiDescription" && (
                  <VideoSegmentControls
                    state={playerState}
                    play={playVideo}
                    pause={pauseVideo}
                    reset={(e) => seekVideo(segments.apiDescription.start)}
                  />
                )}
              </div>

              <div className="w-1/4 px-4">
                <button
                  onClick={async (e) => {
                    await seekVideo(segments.apiBuild.start)
                    await playVideo()
                  }}
                  className={`text-center hover:text-violet-500 block w-full focus:outline-none ${
                    currentSegment === "apiBuild"
                      ? "text-violet-500"
                      : "text-gray-700"
                  }`}
                >
                  Build your API
                </button>
                {currentSegment === "apiBuild" && (
                  <VideoSegmentControls
                    state={playerState}
                    play={playVideo}
                    pause={pauseVideo}
                    reset={(e) => seekVideo(segments.apiBuild.start)}
                  />
                )}
              </div>

              <div className="w-1/4 px-4">
                <button
                  onClick={async (e) => {
                    await seekVideo(segments.apiRun.start)
                    await playVideo()
                  }}
                  className={`block text-center hover:text-violet-500 w-full focus:outline-none ${
                    currentSegment === "apiRun"
                      ? "text-violet-500"
                      : "text-gray-700"
                  }`}
                >
                  Run your API
                </button>
                { currentSegment === "apiRun" && (
                  <VideoSegmentControls
                    state={playerState}
                    play={playVideo}
                    pause={pauseVideo}
                    reset={(e) => seekVideo(segments.apiRun.start)}
                  />
                )}
              </div>
              <div className="w-1/4 px-4">
                <button
                  onClick={async (e) => {
                    await seekVideo(segments.apiGrow.start)
                    await playVideo()
                  }}
                  className={`text-center hover:text-violet-500 block w-full focus:outline-none ${
                    currentSegment === "apiGrow"
                      ? "text-violet-500"
                      : "text-gray-700"
                  }`}
                >
                  Grow your API
                </button>
                {currentSegment === "apiGrow" && (
                  <VideoSegmentControls
                    state={playerState}
                    play={playVideo}
                    pause={pauseVideo}
                    reset={(e) => seekVideo(segments.apiGrow.start)}
                  />
                )}
              </div>
            </div>
          </div>
              
          <div className="h-40 mt-3 overflow-hidden md:h-36 md:mt-10 md:text-center md:flex md:justify-center lg:h-32">
            <FadeBetween currentSegment={currentSegment}>
              <State for="apiDescription">
                <Text color="light-gray">
                  In order to scaffold out a new API, we need to build a simple 
                  yaml or json file to describe what we want our API to 
                  look like. This files is just some basic project info
                  (project name, database info), and a description of your entities.
                  You can also provide optional info like environment information 
                  or a swagger layout.
                </Text>
              </State>
              <State for="apiBuild">
                <Text color="light-gray">
                  Next, we can write single Craftsman CLI command (the 
                  workhorse behind the  Wrapt framework) to build our 
                  API for us. The only information this command needs 
                  is the file path for our API description.
                </Text>
              </State>
              <State for="apiRun">
                <Text color="light-gray">
                  Once we've built our project, it's ready for use. 
                  We now have a well organized project that 
                  has a full complement of robust HTTP endpoints and 
                  all of the boilerplate eliminated for us.
                </Text>
              </State>
              <State for="apiGrow">
                <Text color="light-gray">
                  What we've built so far is a great starting point, 
                  but we still have some work to do to grow our API 
                  to meet our exact business needs. We can now go 
                  into our project and modify it however we normally 
                  would by hand and, if we have another requirement 
                  come up with lots of boilerplate (i.e. adding a new 
                  entity or property), we can use the Craftsman API 
                  to speed our work along!
                </Text>
              </State>
            </FadeBetween>
          </div>
        </div>
      </Gutters>
    </div>

    <div class="relative py-8 bg-white overflow-hidden">
        <div class="hidden lg:block lg:absolute lg:inset-y-0 lg:h-full lg:w-full">
          <div class="relative h-full text-lg max-w-prose mx-auto" aria-hidden="true">
            <svg class="absolute top-12 left-full transform translate-x-72" width="404" height="384" fill="none" viewBox="0 0 404 384">
              <defs>
                <pattern id="74b3fd99-0a6f-4271-bef2-e80eeafdf357" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="currentColor" />
                </pattern>
              </defs>
              <rect width="404" height="384" fill="url(#74b3fd99-0a6f-4271-bef2-e80eeafdf357)" />
            </svg>
            <svg class="absolute bottom-12 right-full transform -translate-x-72" width="404" height="384" fill="none" viewBox="0 0 404 384">
              <defs>
                <pattern id="d3eb07ae-5182-43e6-857d-35c643af9034" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="currentColor" />
                </pattern>
              </defs>
              <rect width="404" height="384" fill="url(#d3eb07ae-5182-43e6-857d-35c643af9034)" />
            </svg>
          </div>
        </div>

        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 bg-white z-50">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">No More Boilerplate</h2>
            <p className="mt-4 text-lg text-gray-500">Wrapt Web APIs eliminate the tedium so you can hit the ground running and get your applications deployed quickly.</p>
          </div>
          <div className="mt-12 space-y-10 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-3 lg:gap-x-8">
            <FeatureBlock 
              title={'Automated HTTP Endpoint Generation'} 
              details={'Every entity will have GET, POST, PUT, PATCH, and DELETE endpoints automatically generated for you so you can hit the ground running right away.'} 
            />
            <FeatureBlock 
              title={'Clean Architecture'} 
              details={'No need to learn a custom organizational structure — Wrapt Web APIs follow best in class practices with Clean Architecture to optimize for flexibility and scalability. '} 
            />
            <FeatureBlock 
              title={'Filtering, Sorting, and Pagination'} 
              details={'Not only will pagination metadata be returned will all your GET collection requests, but complex filtering and sorting is baked right into your repositories as well. '} 
            />
            <FeatureBlock 
              title={'Unit and Integration Tests '} 
              details={'Web APIs generated with Wrapt will scaffold out unit and integration tests for you automatically, so you can make updates with confidence.'} 
            />
            <FeatureBlock 
              title={'Quick Add Commands'} 
              details={"Craftsman CLI commands allow you to add new entities, properties, and more to your projects in seconds. No more jumping around to make sure your addition is in all the right spots."} 
            />
            <FeatureBlock 
              title={'Built in Swagger Documentation'} 
              details={'Providing detailed documentation for how your API works is critical. Wrapt Web APIs will set up reliable Swagger documentation so your users and dev team know how your API works.'} 
            />
            <FeatureBlock 
              title={'Multi-Environment Support'} 
              details={"Built in support to scaffold out as many environments as you'd like."} 
            />
            <FeatureBlock 
              title={'Fluent Validation'} 
              details={'Easily validate your HTTP endpoints using the powerful Fluent Validation library.'}
            />
            <FeatureBlock 
              title={'API Versioning'} 
              details={'Built in API versioning, so your API can grow with your changing needs.'}
            />
            <FeatureBlock 
              title={'Flexible Database Options'} 
              details={"Easily add a database context for SqlServer or Postgres without any manual setup. The MySql library is currently in pre-release, but will be added with 1st party Wrapt support as soon as it is ready for .NET 5."} 
            />
            {/* <FeatureBlock 
              title={'Serilog'} 
              details={'Magna a vel sagittis aliquam eu amet. Et lorem auctor quam nunc odio. Sed bibendum.'} 
            />  */}
          </div>
        </div>
      </div>
    </div>
  )
}

function Gutters({ children }) {
  return <div className="px-5 mt-12 md:px-8">{children}</div>
}


function FadeBetween({ children, currentSegment }) {
  let segments = React.Children.toArray(children).reduce((memo, child) => {
    memo[child.props.for] = child.props.children

    return memo
  }, {})

  const transitions = useTransition(currentSegment, (i) => i, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })

  return (
    <div className="relative w-full">
      {transitions.map(({ item, props, key }) => {
        return (
          <animated.div className="absolute w-full" style={props} key={key}>
            <div className="flex justify-center">{segments[item]}</div>
          </animated.div>
        )
      })}
    </div>
  )
}

function Text({ children, color }) {
  let styles = {
    "light-gray": "text-gray-500",
    "dark-gray": "text-gray-700",
  }

  if (styles[color] === undefined) {
    throw new Error("<Text> requires a color.")
  }

  return (
    <p className={`${styles[color]} md:text-lg max-w-measure`}>{children}</p>
  )
}

function State() {}

function AspectRatio({ ratio, children }) {
  return (
    <div
      className="relative"
      style={{ paddingBottom: `${(1 / ratio) * 100}%` }}
    >
      <div className="absolute inset-0 w-full h-full">{children}</div>
    </div>
  )
}