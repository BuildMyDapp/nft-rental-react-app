import logo from './logo.svg';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {Error404 ,Rent,Lend,Dashboard } from './components/exportComponents'


function App() {
  return (
    <>
        <Router>
          <Routes>
            <Route path="/" element={<Rent />} exact />
            <Route path="/lend" element={<Lend />}  />
            <Route path="/dashboard" element={<Dashboard />}  />

            {/* <Route path="/my_collection" element={<MyCollection />} />
            <Route path="/tier_plans" element={<TierPlans />}  />
            <Route path="/details/:slug_value" element={<TierDetails />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/remaining_nft_table" element={<RemainingAdminNftTable />} />
            <Route path="/admin/minted_nft_table" element={<MintedNftTable />} />
            <Route path="/admin/reject_nft_list" element={<AdminRejectedNftList />} />
            <Route path="/admin/publish_nft" element={<PublishNft />} />
            <Route path="/admin/nft_count" element={<NftCount />} />
            <Route path="/admin/web3_function" element={<Web3Function />} /> */}

            <Route path='*' element={<Error404 />} />
          </Routes>
        </Router>
    </>
  );
}

export default App;
