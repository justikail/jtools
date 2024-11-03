"use client";
import { useState } from "react";
import CardTools from "@/components/card/cardTools";
import CollapseContainer from "@/components/collapse/collapseContainer";
import dynamic from "next/dynamic";

const SSR = dynamic(() => import("./ssr"), { ssr: false });

function CSR() {
  const [options, setOptions] = useState({
    width: 200,
    height: 200,
    data: process.env.NEXT_PUBLIC_PRIMARY_URL,
    margin: 0,
    qrOptions: {
      typeNumber: "0",
      mode: "Byte",
      errorCorrectionLevel: "H",
    },
    imageOptions: {
      hideBackgroundDots: true,
      imageSize: 0.4,
      margin: 0,
    },
    dotsOptions: {
      type: "extra-rounded",
      color: "#6a1a4c",
      gradient: {
        type: "linear",
        rotation: 0,
        colorStops: [
          {
            offset: 0,
            color: "#6a1a4c",
          },
          {
            offset: 1,
            color: "#6a1a4c",
          },
        ],
      },
    },
    backgroundOptions: {
      color: "#ffffff",
      gradient: {
        type: "linear",
        rotation: 0,
        colorStops: [
          {
            offset: 0,
            color: "#ffffff",
          },
          {
            offset: 1,
            color: "#ffffff",
          },
        ],
      },
    },
    image: `${process.env.NEXT_PUBLIC_PRIMARY_URL}/favicon.ico`,
    dotsOptionsHelper: {
      colorType: {
        single: true,
        gradient: false,
      },
      gradient: {
        linear: true,
        radial: false,
        color1: "#6a1a4c",
        color2: "#6a1a4c",
        rotation: 0,
      },
    },
    cornersSquareOptions: {
      type: "extra-rounded",
      color: "#6a1a4c",
      gradient: {
        type: "linear",
        rotation: 0,
        colorStops: [
          {
            offset: 0,
            color: "#000000",
          },
          {
            offset: 1,
            color: "#000000",
          },
        ],
      },
    },
    cornersSquareOptionsHelper: {
      colorType: {
        single: true,
        gradient: false,
      },
      gradient: {
        linear: true,
        radial: false,
        color1: "#000000",
        color2: "#000000",
        rotation: "0",
      },
    },
    cornersDotOptions: {
      type: "",
      color: "#000000",
      gradient: {
        type: "linear",
        rotation: 0,
        colorStops: [
          {
            offset: 0,
            color: "#000000",
          },
          {
            offset: 1,
            color: "#000000",
          },
        ],
      },
    },
    cornersDotOptionsHelper: {
      colorType: {
        single: true,
        gradient: false,
      },
      gradient: {
        linear: true,
        radial: false,
        color1: "#000000",
        color2: "#000000",
        rotation: "0",
      },
    },
    backgroundOptionsHelper: {
      colorType: {
        single: true,
        gradient: false,
      },
      gradient: {
        linear: true,
        radial: false,
        color1: "#ffffff",
        color2: "#ffffff",
        rotation: "0",
      },
    },
  });

  const handleOnChangeImg = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        setOptions((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    } else {
      setError("Please upload a valid image file.");
      setTimeout(() => setError(null), 3000);
    }
  };

  return (
    <CardTools title="QRCode Generator" description="Tools untuk membuat QR Code dengan style yang unik dan menarik.">
      <div className="flex flex-col gap-4 w-full p-1 md:p-4">
        <SSR options={options} />
        <CollapseContainer title="Main Options" isOpen={true}>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Link:</span>
            </div>
            <input type="text" placeholder="Link tujuan" className="input input-bordered w-full" value={options.data} onChange={(e) => setOptions({ ...options, data: e.target.value })} />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text text-sm">Image:</span>
            </div>
            <input type="file" accept="image/*" className="file-input file-input-bordered w-full" onChange={handleOnChangeImg} />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Margin:</span>
            </div>
            <input
              type="number"
              min={0}
              placeholder="E.g. 10"
              className="input input-bordered w-full"
              value={options.margin}
              onChange={(e) => setOptions({ ...options, margin: Math.max(0, isNaN(parseInt(e.target.value)) ? 0 : parseInt(e.target.value)) })}
            />
          </label>
        </CollapseContainer>
        <CollapseContainer title="Dots Options">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Dots Style:</span>
            </div>
            <select className="select select-bordered" value={options.dotsOptions.type} onChange={(e) => setOptions({ ...options, dotsOptions: { ...options.dotsOptions, type: e.target.value } })}>
              <option defaultValue>Pick one</option>
              <option value="square">Square</option>
              <option value="dots">Dots</option>
              <option value="rounded">Rounded</option>
              <option value="extra-rounded">Extra rounded</option>
              <option value="classy">Classy</option>
              <option value="classy-rounded">Classy rounded</option>
            </select>
          </label>
          <div className="form-control md:flex-row md:items-center items-start gap-2">
            <span className="label-text">Color Type:</span>
            <div className="form-control">
              <label className="label cursor-pointer gap-2">
                <input
                  type="checkbox"
                  className="checkbox w-4 h-4 checkbox-primary"
                  checked={options.dotsOptionsHelper.colorType.single}
                  onChange={() => {
                    setOptions({ ...options, dotsOptions: { type: options.dotsOptions.type, color: options.dotsOptions.color }, dotsOptionsHelper: { ...options.dotsOptionsHelper, colorType: { single: true, gradient: false } } });
                  }}
                />
                <span className="label-text">Single</span>
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer gap-2">
                <input
                  type="checkbox"
                  className="checkbox w-4 h-4 checkbox-primary"
                  checked={options.dotsOptionsHelper.colorType.gradient}
                  onChange={() =>
                    setOptions({
                      ...options,
                      dotsOptions: {
                        type: options.dotsOptions.type,
                        color: options.dotsOptions.color,
                        gradient: {
                          type: "linear",
                          rotation: 0,
                          colorStops: [
                            { offset: 0, color: "#6a1a4c" },
                            { offset: 1, color: "#6a1a4c" },
                          ],
                        },
                      },
                      dotsOptionsHelper: { ...options.dotsOptionsHelper, colorType: { single: false, gradient: true } },
                    })
                  }
                />
                <span className="label-text">Gradient</span>
              </label>
            </div>
          </div>
          {options.dotsOptionsHelper.colorType.single ? (
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Color:</span>
              </div>
              <input type="color" className="input input-bordered w-full" value={options.dotsOptions.color} onChange={(e) => setOptions({ ...options, dotsOptions: { type: options.dotsOptions.type, color: e.target.value } })} />
            </label>
          ) : (
            <>
              <div className="form-control md:flex-row md:items-center items-start gap-2">
                <span className="label-text">Gradient Type:</span>
                <div className="form-control">
                  <label className="label cursor-pointer gap-2">
                    <input
                      type="checkbox"
                      className="checkbox w-4 h-4 checkbox-primary"
                      checked={options.dotsOptionsHelper.gradient.linear}
                      onChange={() =>
                        setOptions({
                          ...options,
                          dotsOptions: {
                            ...options.dotsOptions,
                            gradient: {
                              type: "linear",
                              rotation: 0,
                              colorStops: [
                                { offset: 0, color: "#6a1a4c" },
                                { offset: 1, color: "#6a1a4c" },
                              ],
                            },
                          },
                          dotsOptionsHelper: { ...options.dotsOptionsHelper, gradient: { ...options.dotsOptionsHelper.gradient, linear: true, radial: false } },
                        })
                      }
                    />
                    <span className="label-text">Linear</span>
                  </label>
                </div>
                <div className="form-control">
                  <label className="label cursor-pointer gap-2">
                    <input
                      type="checkbox"
                      className="checkbox w-4 h-4 checkbox-primary"
                      checked={options.dotsOptionsHelper.gradient.radial}
                      onChange={() =>
                        setOptions({
                          ...options,
                          dotsOptions: {
                            ...options.dotsOptions,
                            gradient: {
                              type: "radial",
                              rotation: 0,
                              colorStops: [
                                { offset: 0, color: "#6a1a4c" },
                                { offset: 1, color: "#6a1a4c" },
                              ],
                            },
                          },
                          dotsOptionsHelper: { ...options.dotsOptionsHelper, gradient: { ...options.dotsOptionsHelper.gradient, linear: false, radial: true } },
                        })
                      }
                    />
                    <span className="label-text">Radial</span>
                  </label>
                </div>
              </div>
              <div className="form-control md:flex-row md:items-center items-start gap-2">
                <span className="label-text">Gradient Color:</span>
                <label className="form-control w-full">
                  <input
                    type="color"
                    className="input input-bordered w-full"
                    value={options.dotsOptions.gradient.colorStops[0].color}
                    onChange={(e) =>
                      setOptions({
                        ...options,
                        dotsOptions: {
                          ...options.dotsOptions,
                          gradient: { ...options.dotsOptions.gradient, colorStops: [{ ...options.dotsOptions.gradient.colorStops[0], color: e.target.value }, options.dotsOptions.gradient.colorStops[1]] },
                        },
                      })
                    }
                  />
                </label>
                <label className="form-control w-full">
                  <input
                    type="color"
                    className="input input-bordered w-full"
                    value={options.dotsOptions.gradient.colorStops[1].color}
                    onChange={(e) =>
                      setOptions({
                        ...options,
                        dotsOptions: {
                          ...options.dotsOptions,
                          gradient: { ...options.dotsOptions.gradient, colorStops: [options.dotsOptions.gradient.colorStops[0], { ...options.dotsOptions.gradient.colorStops[1], color: e.target.value }] },
                        },
                      })
                    }
                  />
                </label>
              </div>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Rotation:</span>
                </div>
                <input
                  type="number"
                  placeholder="E.g. 10"
                  className="input input-bordered w-full"
                  min={0}
                  value={options.dotsOptionsHelper.gradient.rotation}
                  onChange={(e) =>
                    setOptions({
                      ...options,
                      dotsOptions: { ...options.dotsOptions, gradient: { ...options.dotsOptions.gradient, rotation: parseInt(e.target.value) * (Math.PI / 180) } },
                      dotsOptionsHelper: { ...options.dotsOptionsHelper, gradient: { ...options.dotsOptionsHelper.gradient, rotation: Math.max(0, isNaN(parseInt(e.target.value)) ? 0 : parseInt(e.target.value)) } },
                    })
                  }
                />
              </label>
            </>
          )}
        </CollapseContainer>
        <CollapseContainer title="Corners Square Options">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Corners Square Style:</span>
            </div>
            <select className="select select-bordered" value={options.cornersSquareOptions.type} onChange={(e) => setOptions({ ...options, cornersSquareOptions: { ...options.cornersSquareOptions, type: e.target.value } })}>
              <option defaultValue>Pick one</option>
              <option value="square">Square</option>
              <option value="dot">Dot</option>
              <option value="extra-rounded">Extra rounded</option>
            </select>
          </label>
          <div className="form-control md:flex-row md:items-center items-start gap-2">
            <span className="label-text">Color Type:</span>
            <div className="form-control">
              <label className="label cursor-pointer gap-2">
                <input
                  type="checkbox"
                  className="checkbox w-4 h-4 checkbox-primary"
                  checked={options.cornersSquareOptionsHelper.colorType.single}
                  onChange={() => {
                    setOptions({
                      ...options,
                      cornersSquareOptions: { type: options.cornersSquareOptions.type, color: options.cornersSquareOptions.color },
                      cornersSquareOptionsHelper: { ...options.cornersSquareOptionsHelper, colorType: { single: true, gradient: false } },
                    });
                  }}
                />
                <span className="label-text">Single</span>
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer gap-2">
                <input
                  type="checkbox"
                  className="checkbox w-4 h-4 checkbox-primary"
                  checked={options.cornersSquareOptionsHelper.colorType.gradient}
                  onChange={() =>
                    setOptions({
                      ...options,
                      cornersSquareOptions: {
                        type: options.cornersSquareOptions.type,
                        color: options.cornersSquareOptions.color,
                        gradient: {
                          type: "linear",
                          rotation: 0,
                          colorStops: [
                            { offset: 0, color: "#6a1a4c" },
                            { offset: 1, color: "#6a1a4c" },
                          ],
                        },
                      },
                      cornersSquareOptionsHelper: { ...options.cornersSquareOptionsHelper, colorType: { single: false, gradient: true } },
                    })
                  }
                />
                <span className="label-text">Gradient</span>
              </label>
            </div>
          </div>
          {options.cornersSquareOptionsHelper.colorType.single ? (
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Color:</span>
              </div>
              <input
                type="color"
                className="input input-bordered w-full"
                value={options.cornersSquareOptions.color}
                onChange={(e) => setOptions({ ...options, cornersSquareOptions: { type: options.cornersSquareOptions.type, color: e.target.value } })}
              />
            </label>
          ) : (
            <>
              <div className="form-control md:flex-row md:items-center items-start gap-2">
                <span className="label-text">Gradient Type:</span>
                <div className="form-control">
                  <label className="label cursor-pointer gap-2">
                    <input
                      type="checkbox"
                      className="checkbox w-4 h-4 checkbox-primary"
                      checked={options.cornersSquareOptionsHelper.gradient.linear}
                      onChange={() =>
                        setOptions({
                          ...options,
                          cornersSquareOptions: {
                            ...options.cornersSquareOptions,
                            gradient: {
                              type: "linear",
                              rotation: 0,
                              colorStops: [
                                { offset: 0, color: "#6a1a4c" },
                                { offset: 1, color: "#6a1a4c" },
                              ],
                            },
                          },
                          cornersSquareOptionsHelper: { ...options.cornersSquareOptionsHelper, gradient: { ...options.cornersSquareOptionsHelper.gradient, linear: true, radial: false } },
                        })
                      }
                    />
                    <span className="label-text">Linear</span>
                  </label>
                </div>
                <div className="form-control">
                  <label className="label cursor-pointer gap-2">
                    <input
                      type="checkbox"
                      className="checkbox w-4 h-4 checkbox-primary"
                      checked={options.cornersSquareOptionsHelper.gradient.radial}
                      onChange={() =>
                        setOptions({
                          ...options,
                          cornersSquareOptions: {
                            ...options.cornersSquareOptions,
                            gradient: {
                              type: "radial",
                              rotation: 0,
                              colorStops: [
                                { offset: 0, color: "#6a1a4c" },
                                { offset: 1, color: "#6a1a4c" },
                              ],
                            },
                          },
                          cornersSquareOptionsHelper: { ...options.cornersSquareOptionsHelper, gradient: { ...options.cornersSquareOptionsHelper.gradient, linear: false, radial: true } },
                        })
                      }
                    />
                    <span className="label-text">Radial</span>
                  </label>
                </div>
              </div>
              <div className="form-control md:flex-row md:items-center items-start gap-2">
                <span className="label-text">Gradient Color:</span>
                <label className="form-control w-full">
                  <input
                    type="color"
                    className="input input-bordered w-full"
                    value={options.cornersSquareOptions.gradient.colorStops[0].color}
                    onChange={(e) =>
                      setOptions({
                        ...options,
                        cornersSquareOptions: {
                          ...options.cornersSquareOptions,
                          gradient: { ...options.cornersSquareOptions.gradient, colorStops: [{ ...options.cornersSquareOptions.gradient.colorStops[0], color: e.target.value }, options.cornersSquareOptions.gradient.colorStops[1]] },
                        },
                      })
                    }
                  />
                </label>
                <label className="form-control w-full">
                  <input
                    type="color"
                    className="input input-bordered w-full"
                    value={options.cornersSquareOptions.gradient.colorStops[1].color}
                    onChange={(e) =>
                      setOptions({
                        ...options,
                        cornersSquareOptions: {
                          ...options.cornersSquareOptions,
                          gradient: { ...options.cornersSquareOptions.gradient, colorStops: [options.cornersSquareOptions.gradient.colorStops[0], { ...options.cornersSquareOptions.gradient.colorStops[1], color: e.target.value }] },
                        },
                      })
                    }
                  />
                </label>
              </div>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Rotation:</span>
                </div>
                <input
                  type="number"
                  placeholder="E.g. 10"
                  className="input input-bordered w-full"
                  min={0}
                  value={options.cornersSquareOptionsHelper.gradient.rotation}
                  onChange={(e) =>
                    setOptions({
                      ...options,
                      cornersSquareOptions: { ...options.cornersSquareOptions, gradient: { ...options.cornersSquareOptions.gradient, rotation: parseInt(e.target.value) * (Math.PI / 180) } },
                      cornersSquareOptionsHelper: {
                        ...options.cornersSquareOptionsHelper,
                        gradient: { ...options.cornersSquareOptionsHelper.gradient, rotation: Math.max(0, isNaN(parseInt(e.target.value)) ? 0 : parseInt(e.target.value)) },
                      },
                    })
                  }
                />
              </label>
            </>
          )}
        </CollapseContainer>
        <CollapseContainer title="Corners Dots Options">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Corners Dots Style:</span>
            </div>
            <select className="select select-bordered" value={options.cornersDotOptions.type} onChange={(e) => setOptions({ ...options, cornersDotOptions: { ...options.cornersDotOptions, type: e.target.value } })}>
              <option defaultValue>Pick one</option>
              <option value="square">Square</option>
              <option value="dot">Dot</option>
            </select>
          </label>
          <div className="form-control md:flex-row md:items-center items-start gap-2">
            <span className="label-text">Color Type:</span>
            <div className="form-control">
              <label className="label cursor-pointer gap-2">
                <input
                  type="checkbox"
                  className="checkbox w-4 h-4 checkbox-primary"
                  checked={options.cornersDotOptionsHelper.colorType.single}
                  onChange={() => {
                    setOptions({
                      ...options,
                      cornersDotOptions: { type: options.cornersDotOptions.type, color: options.cornersDotOptions.color },
                      cornersDotOptionsHelper: { ...options.cornersDotOptionsHelper, colorType: { single: true, gradient: false } },
                    });
                  }}
                />
                <span className="label-text">Single</span>
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer gap-2">
                <input
                  type="checkbox"
                  className="checkbox w-4 h-4 checkbox-primary"
                  checked={options.cornersDotOptionsHelper.colorType.gradient}
                  onChange={() =>
                    setOptions({
                      ...options,
                      cornersDotOptions: {
                        type: options.cornersDotOptions.type,
                        color: options.cornersDotOptions.color,
                        gradient: {
                          type: "linear",
                          rotation: 0,
                          colorStops: [
                            { offset: 0, color: "#6a1a4c" },
                            { offset: 1, color: "#6a1a4c" },
                          ],
                        },
                      },
                      cornersDotOptionsHelper: { ...options.cornersDotOptionsHelper, colorType: { single: false, gradient: true } },
                    })
                  }
                />
                <span className="label-text">Gradient</span>
              </label>
            </div>
          </div>
          {options.cornersDotOptionsHelper.colorType.single ? (
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Color:</span>
              </div>
              <input
                type="color"
                className="input input-bordered w-full"
                value={options.cornersDotOptions.color}
                onChange={(e) => setOptions({ ...options, cornersDotOptions: { type: options.cornersDotOptions.type, color: e.target.value } })}
              />
            </label>
          ) : (
            <>
              <div className="form-control md:flex-row md:items-center items-start gap-2">
                <span className="label-text">Gradient Type:</span>
                <div className="form-control">
                  <label className="label cursor-pointer gap-2">
                    <input
                      type="checkbox"
                      className="checkbox w-4 h-4 checkbox-primary"
                      checked={options.cornersDotOptionsHelper.gradient.linear}
                      onChange={() =>
                        setOptions({
                          ...options,
                          cornersDotOptions: {
                            ...options.cornersDotOptions,
                            gradient: {
                              type: "linear",
                              rotation: 0,
                              colorStops: [
                                { offset: 0, color: "#6a1a4c" },
                                { offset: 1, color: "#6a1a4c" },
                              ],
                            },
                          },
                          cornersDotOptionsHelper: { ...options.cornersDotOptionsHelper, gradient: { ...options.cornersDotOptionsHelper.gradient, linear: true, radial: false } },
                        })
                      }
                    />
                    <span className="label-text">Linear</span>
                  </label>
                </div>
                <div className="form-control">
                  <label className="label cursor-pointer gap-2">
                    <input
                      type="checkbox"
                      className="checkbox w-4 h-4 checkbox-primary"
                      checked={options.cornersDotOptionsHelper.gradient.radial}
                      onChange={() =>
                        setOptions({
                          ...options,
                          cornersDotOptions: {
                            ...options.cornersDotOptions,
                            gradient: {
                              type: "radial",
                              rotation: 0,
                              colorStops: [
                                { offset: 0, color: "#6a1a4c" },
                                { offset: 1, color: "#6a1a4c" },
                              ],
                            },
                          },
                          cornersDotOptionsHelper: { ...options.cornersDotOptionsHelper, gradient: { ...options.cornersDotOptionsHelper.gradient, linear: false, radial: true } },
                        })
                      }
                    />
                    <span className="label-text">Radial</span>
                  </label>
                </div>
              </div>
              <div className="form-control md:flex-row md:items-center items-start gap-2">
                <span className="label-text">Gradient Color:</span>
                <label className="form-control w-full">
                  <input
                    type="color"
                    className="input input-bordered w-full"
                    value={options.cornersDotOptions.gradient.colorStops[0].color}
                    onChange={(e) =>
                      setOptions({
                        ...options,
                        cornersDotOptions: {
                          ...options.cornersDotOptions,
                          gradient: { ...options.cornersDotOptions.gradient, colorStops: [{ ...options.cornersDotOptions.gradient.colorStops[0], color: e.target.value }, options.cornersDotOptions.gradient.colorStops[1]] },
                        },
                      })
                    }
                  />
                </label>
                <label className="form-control w-full">
                  <input
                    type="color"
                    className="input input-bordered w-full"
                    value={options.cornersDotOptions.gradient.colorStops[1].color}
                    onChange={(e) =>
                      setOptions({
                        ...options,
                        cornersDotOptions: {
                          ...options.cornersDotOptions,
                          gradient: { ...options.cornersDotOptions.gradient, colorStops: [options.cornersDotOptions.gradient.colorStops[0], { ...options.cornersDotOptions.gradient.colorStops[1], color: e.target.value }] },
                        },
                      })
                    }
                  />
                </label>
              </div>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Rotation:</span>
                </div>
                <input
                  type="number"
                  placeholder="E.g. 10"
                  className="input input-bordered w-full"
                  min={0}
                  value={options.cornersDotOptionsHelper.gradient.rotation}
                  onChange={(e) =>
                    setOptions({
                      ...options,
                      cornersDotOptions: { ...options.cornersDotOptions, gradient: { ...options.cornersDotOptions.gradient, rotation: parseInt(e.target.value) * (Math.PI / 180) } },
                      cornersDotOptionsHelper: { ...options.cornersDotOptionsHelper, gradient: { ...options.cornersDotOptionsHelper.gradient, rotation: Math.max(0, isNaN(parseInt(e.target.value)) ? 0 : parseInt(e.target.value)) } },
                    })
                  }
                />
              </label>
            </>
          )}
        </CollapseContainer>
        <CollapseContainer title="Background Options">
          <div className="form-control md:flex-row md:items-center items-start gap-2">
            <span className="label-text">Color Type:</span>
            <div className="form-control">
              <label className="label cursor-pointer gap-2">
                <input
                  type="checkbox"
                  className="checkbox w-4 h-4 checkbox-primary"
                  checked={options.backgroundOptionsHelper.colorType.single}
                  onChange={() => {
                    setOptions({
                      ...options,
                      backgroundOptions: { type: options.backgroundOptions.type, color: options.backgroundOptions.color },
                      backgroundOptionsHelper: { ...options.backgroundOptionsHelper, colorType: { single: true, gradient: false } },
                    });
                  }}
                />
                <span className="label-text">Single</span>
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer gap-2">
                <input
                  type="checkbox"
                  className="checkbox w-4 h-4 checkbox-primary"
                  checked={options.backgroundOptionsHelper.colorType.gradient}
                  onChange={() =>
                    setOptions({
                      ...options,
                      backgroundOptions: {
                        type: options.backgroundOptions.type,
                        color: options.backgroundOptions.color,
                        gradient: {
                          type: "linear",
                          rotation: 0,
                          colorStops: [
                            { offset: 0, color: "#6a1a4c" },
                            { offset: 1, color: "#6a1a4c" },
                          ],
                        },
                      },
                      backgroundOptionsHelper: { ...options.backgroundOptionsHelper, colorType: { single: false, gradient: true } },
                    })
                  }
                />
                <span className="label-text">Gradient</span>
              </label>
            </div>
          </div>
          {options.backgroundOptionsHelper.colorType.single ? (
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Color:</span>
              </div>
              <input
                type="color"
                className="input input-bordered w-full"
                value={options.backgroundOptions.color}
                onChange={(e) => setOptions({ ...options, backgroundOptions: { type: options.backgroundOptions.type, color: e.target.value } })}
              />
            </label>
          ) : (
            <>
              <div className="form-control md:flex-row md:items-center items-start gap-2">
                <span className="label-text">Gradient Type:</span>
                <div className="form-control">
                  <label className="label cursor-pointer gap-2">
                    <input
                      type="checkbox"
                      className="checkbox w-4 h-4 checkbox-primary"
                      checked={options.backgroundOptionsHelper.gradient.linear}
                      onChange={() =>
                        setOptions({
                          ...options,
                          backgroundOptions: {
                            ...options.backgroundOptions,
                            gradient: {
                              type: "linear",
                              rotation: 0,
                              colorStops: [
                                { offset: 0, color: "#6a1a4c" },
                                { offset: 1, color: "#6a1a4c" },
                              ],
                            },
                          },
                          backgroundOptionsHelper: { ...options.backgroundOptionsHelper, gradient: { ...options.backgroundOptionsHelper.gradient, linear: true, radial: false } },
                        })
                      }
                    />
                    <span className="label-text">Linear</span>
                  </label>
                </div>
                <div className="form-control">
                  <label className="label cursor-pointer gap-2">
                    <input
                      type="checkbox"
                      className="checkbox w-4 h-4 checkbox-primary"
                      checked={options.backgroundOptionsHelper.gradient.radial}
                      onChange={() =>
                        setOptions({
                          ...options,
                          backgroundOptions: {
                            ...options.backgroundOptions,
                            gradient: {
                              type: "radial",
                              rotation: 0,
                              colorStops: [
                                { offset: 0, color: "#6a1a4c" },
                                { offset: 1, color: "#6a1a4c" },
                              ],
                            },
                          },
                          backgroundOptionsHelper: { ...options.backgroundOptionsHelper, gradient: { ...options.backgroundOptionsHelper.gradient, linear: false, radial: true } },
                        })
                      }
                    />
                    <span className="label-text">Radial</span>
                  </label>
                </div>
              </div>
              <div className="form-control md:flex-row md:items-center items-start gap-2">
                <span className="label-text">Gradient Color:</span>
                <label className="form-control w-full">
                  <input
                    type="color"
                    className="input input-bordered w-full"
                    value={options.backgroundOptions.gradient.colorStops[0].color}
                    onChange={(e) =>
                      setOptions({
                        ...options,
                        backgroundOptions: {
                          ...options.backgroundOptions,
                          gradient: { ...options.backgroundOptions.gradient, colorStops: [{ ...options.backgroundOptions.gradient.colorStops[0], color: e.target.value }, options.backgroundOptions.gradient.colorStops[1]] },
                        },
                      })
                    }
                  />
                </label>
                <label className="form-control w-full">
                  <input
                    type="color"
                    className="input input-bordered w-full"
                    value={options.backgroundOptions.gradient.colorStops[1].color}
                    onChange={(e) =>
                      setOptions({
                        ...options,
                        backgroundOptions: {
                          ...options.backgroundOptions,
                          gradient: { ...options.backgroundOptions.gradient, colorStops: [options.backgroundOptions.gradient.colorStops[0], { ...options.backgroundOptions.gradient.colorStops[1], color: e.target.value }] },
                        },
                      })
                    }
                  />
                </label>
              </div>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Rotation:</span>
                </div>
                <input
                  type="number"
                  placeholder="E.g. 10"
                  className="input input-bordered w-full"
                  min={0}
                  value={options.backgroundOptionsHelper.gradient.rotation}
                  onChange={(e) =>
                    setOptions({
                      ...options,
                      backgroundOptions: { ...options.backgroundOptions, gradient: { ...options.backgroundOptions.gradient, rotation: parseInt(e.target.value) * (Math.PI / 180) } },
                      backgroundOptionsHelper: { ...options.backgroundOptionsHelper, gradient: { ...options.backgroundOptionsHelper.gradient, rotation: Math.max(0, isNaN(parseInt(e.target.value)) ? 0 : parseInt(e.target.value)) } },
                    })
                  }
                />
              </label>
            </>
          )}
        </CollapseContainer>
        <CollapseContainer title="Image Options">
          <div className="form-control">
            <label className="label justify-start cursor-pointer gap-2">
              <span className="label-text">Hide Background Dots</span>
              <input
                type="checkbox"
                className="checkbox w-4 h-4 checkbox-primary"
                checked={options.imageOptions.hideBackgroundDots}
                onChange={() => setOptions({ ...options, imageOptions: { ...options.imageOptions, hideBackgroundDots: !options.imageOptions.hideBackgroundDots } })}
              />
            </label>
          </div>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Image Size:</span>
            </div>
            <input
              type="number"
              min={0}
              placeholder="E.g. 10"
              className="input input-bordered w-full"
              value={options.imageOptions.imageSize}
              onChange={(e) => setOptions({ ...options, imageOptions: { ...options.imageOptions, imageSize: Math.max(0, isNaN(parseInt(e.target.value)) ? 0 : parseInt(e.target.value)) } })}
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Margin:</span>
            </div>
            <input
              type="number"
              min={0}
              placeholder="E.g. 10"
              className="input input-bordered w-full"
              value={options.imageOptions.margin}
              onChange={(e) => setOptions({ ...options, imageOptions: { ...options.imageOptions, margin: Math.max(0, isNaN(parseInt(e.target.value)) ? 0 : parseInt(e.target.value)) } })}
            />
          </label>
        </CollapseContainer>
      </div>
    </CardTools>
  );
}

export default CSR;
