const str = "a_b_c_d_e_f_g_h_i_j_k_l_m_n_o_p_q_r_s_t_u_v_w_x_y_z".repeat(__ITERATIONS__);

const out = str.split("_").join("-").length;
