import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import MainHeader from "../navbar/MainHeader";
import { Layout, Breadcrumb, Tabs } from "antd";
import "./Secure.css";
import Categories from "./Categories";
import CategoryTemplate from "./Category/CategoryTemplate";
import MyForms from "./MyForms";
import Favorites from "./Favorites";
import SearchBar from "../search/searchBar";

const { Content, Footer } = Layout;
const { TabPane } = Tabs;

function debounce(fn, ms) {
  let timer;
  return (_) => {
    clearTimeout(timer);
    timer = setTimeout((_) => {
      timer = null;
      fn.apply(this, arguments);
    }, ms);
  };
}

const Secure = () => {
  const history = useNavigate();
  const { userData } = useContext(UserContext);
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });
  const [activeTabKey, setActiveTabkey] = useState("1");
  const [category, setCategory] = useState("");

  useEffect(() => {
    const debouncedHandleResize = debounce(function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    }, 1000);
    window.addEventListener("resize", debouncedHandleResize);
    return (_) => {
      window.removeEventListener("resize", debouncedHandleResize);
    };
  });

  useEffect(() => {
    console.log(userData);
    if (!userData.user) {
      history("/");
    }
  }, [userData, history]);

  const onCategorySelect = (categoryName) => {
    setCategory(categoryName);
  };

  const onCategoryDeselect = () => {
    setCategory("");
  };

  return (
    <>
      <style type="text/css">
        {`
          .ant-tabs-ink-bar {
            background-color: #03ef62;
          }
          .ant-tabs-ink-bar-animated {
            background-color: #03ef62;
          }
          .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn, .ant-tabs-tab:hover  {
            color: #03ef62;
          }
          .ant-breadcrumb-link:hover {
            cursor: pointer;
            color: black;
          }
        `}
      </style>
      <MainHeader />
      <Layout className="layout">
        <Content
          style={
            dimensions.width < 500
              ? { padding: "0 10px" }
              : { padding: "0 30px" }
          }
        >
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            {activeTabKey === "1" && (
              <Breadcrumb.Item
                onClick={() => {
                  onCategoryDeselect();
                }}
              >
                Categories
              </Breadcrumb.Item>
            )}
            {activeTabKey === "1" && category !== "" && (
              <Breadcrumb.Item>{category}</Breadcrumb.Item>
            )}
            {activeTabKey === "2" && <Breadcrumb.Item>MyForms</Breadcrumb.Item>}
            {activeTabKey === "3" && (
              <Breadcrumb.Item>Favorites</Breadcrumb.Item>
            )}
          </Breadcrumb>
          <SearchBar />
          <div className="site-layout-content">
            <Tabs
              onChange={(activeKey) => {
                setActiveTabkey(activeKey);
              }}
              tabPosition={dimensions.width < 500 ? "top" : "left"}
            >
              <TabPane tab="Categories" key="1">
                {category === "" ? (
                  <Categories categorySelectHandler={onCategorySelect} />
                ) : (
                  <CategoryTemplate
                    categoryName={category}
                  />
                )}
              </TabPane>
              <TabPane tab="Favorites" key="2">
                <Favorites />
              </TabPane>
              <TabPane tab="My Forms" key="3">
                <MyForms />
              </TabPane>
            </Tabs>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}></Footer>
      </Layout>
    </>
  );
};

export default Secure;
